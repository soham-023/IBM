class IBMService {
  constructor() {
    this.apiKey = localStorage.getItem('ibm_api_key') || '';
    this.apiUrl = localStorage.getItem('ibm_api_url') || 'https://us-south.ml.cloud.ibm.com';
    this.projectId = localStorage.getItem('ibm_project_id') || '';
    this.modelId = localStorage.getItem('ibm_model_id') || 'ibm/granite-13b-chat-v2';
    this.accessToken = null;
    this.tokenExpiry = 0;
  }

  saveSettings(apiKey, apiUrl, projectId, modelId) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.projectId = projectId;
    this.modelId = modelId;
    localStorage.setItem('ibm_api_key', apiKey);
    localStorage.setItem('ibm_api_url', apiUrl);
    localStorage.setItem('ibm_project_id', projectId);
    localStorage.setItem('ibm_model_id', modelId);
  }

  isConfigured() {
    return !!(this.apiKey && this.projectId);
  }

  async getAccessToken() {
    // Get IAM token from IBM Cloud
    // POST https://iam.cloud.ibm.com/identity/token
    // grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=YOUR_API_KEY
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    try {
      const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${this.apiKey}`
      });
      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Failed to authenticate with IBM Cloud. Check your API key.');
    }
  }

  async generate(prompt, maxTokens = 1024) {
    // POST {apiUrl}/ml/v1/text/generation?version=2024-03-14
    // Uses the watsonx.ai text generation API
    if (!this.isConfigured()) {
      throw new Error('IBM watsonx.ai is not configured. Go to Settings to add your API key.');
    }
    try {
      const token = await this.getAccessToken();
      const response = await fetch(`${this.apiUrl}/ml/v1/text/generation?version=2024-03-14`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model_id: this.modelId,
          input: prompt,
          project_id: this.projectId,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.1,
            stop_sequences: ['\n\n---END---']
          }
        })
      });
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].generated_text;
      }
      throw new Error('No response from model');
    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      await this.getAccessToken();
      // Try a simple generation
      const result = await this.generate('Hello, respond with OK.', 10);
      return { success: true, message: 'Connection successful! Model responded.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Prompt builders for different study material types
  buildSummaryPrompt(content) {
    return `You are an expert study assistant. Summarize the following study material into a clear, concise, well-structured summary with key points, important definitions, and main concepts. Use bullet points and headers.

Study Material:
${content}

Structured Summary:`;
  }

  buildFlashcardsPrompt(content) {
    return `You are an expert study assistant. Generate 8 flashcards from the following study material. Each flashcard should have a question on the front and a concise answer on the back.

Format each flashcard EXACTLY as:
Q: [question]
A: [answer]

Study Material:
${content}

Flashcards:`;
  }

  buildConceptMapPrompt(content) {
    return `You are an expert study assistant. Create a concept map from the following study material. List the main concepts and their relationships.

Format as:
CONCEPT: [name]
RELATED TO: [other concept] - [relationship description]

Study Material:
${content}

Concept Map:`;
  }

  buildStudyGuidePrompt(content) {
    return `You are an expert study assistant. Create a comprehensive study guide from the following material. Include:
1. Learning Objectives
2. Key Concepts with explanations
3. Important Formulas/Definitions
4. Common Exam Questions
5. Quick Review Points

Study Material:
${content}

Study Guide:`;
  }

  buildQuizPrompt(topic, difficulty, count) {
    return `Generate ${count} multiple-choice quiz questions about ${topic} at ${difficulty} difficulty level.

Format each question EXACTLY as:
QUESTION: [question text]
A) [option a]
B) [option b]
C) [option c]
D) [option d]
CORRECT: [letter]
EXPLANATION: [brief explanation]

Questions:`;
  }

  buildStudyPlanPrompt(topics, examDate, weakAreas) {
    return `Create a personalized study plan for a student with the following details:

Topics to cover: ${topics.join(', ')}
Exam date: ${examDate}
Weak areas needing extra focus: ${weakAreas.join(', ')}

Create a day-by-day study plan with specific topics, recommended study time, and practice exercises. Prioritize weak areas.

Study Plan:`;
  }

  // Parse flashcards from generated text
  parseFlashcards(text) {
    const cards = [];
    const regex = /Q:\s*(.+?)\nA:\s*(.+?)(?=\nQ:|$)/gs;
    let match;
    while ((match = regex.exec(text)) !== null) {
      cards.push({ question: match[1].trim(), answer: match[2].trim() });
    }
    return cards;
  }

  // Parse quiz questions from generated text
  parseQuizQuestions(text) {
    const questions = [];
    const regex = /QUESTION:\s*(.+?)\nA\)\s*(.+?)\nB\)\s*(.+?)\nC\)\s*(.+?)\nD\)\s*(.+?)\nCORRECT:\s*([A-D])\nEXPLANATION:\s*(.+?)(?=\nQUESTION:|$)/gs;
    let match;
    while ((match = regex.exec(text)) !== null) {
      questions.push({
        question: match[1].trim(),
        options: [match[2].trim(), match[3].trim(), match[4].trim(), match[5].trim()],
        correct: ['A','B','C','D'].indexOf(match[6].trim()),
        explanation: match[7].trim()
      });
    }
    return questions;
  }
}

// Global instance
const ibmService = new IBMService();
