// ===== NAVIGATION =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;
    navItems.forEach(n => n.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(`section-${section}`).classList.add('active');
  });
});

// ===== TOAST =====
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, duration);
}

// ===== DASHBOARD =====
// Mock data for dashboard
const studyData = {
  topicsCovered: 24,
  flashcardsReviewed: 156,
  avgQuizScore: 87,
  dayStreak: 12,
  weeklyProgress: [65, 72, 58, 85, 90, 78, 82], // Mon-Sun
  weakAreas: [
    { topic: 'Quantum Mechanics', score: 42, color: 'var(--coral)' },
    { topic: 'Organic Chemistry', score: 55, color: 'var(--amber)' },
    { topic: 'Linear Algebra', score: 61, color: 'var(--amber)' },
    { topic: 'Cell Biology', score: 68, color: 'var(--cyan)' }
  ],
  alerts: [
    { icon: 'ri-alert-line', message: 'Focus on Quantum Mechanics — frequently asked in exams (78% probability)', type: 'warning' },
    { icon: 'ri-lightbulb-flash-line', message: 'Great progress in Data Structures! Ready for advanced topics.', type: 'success' },
    { icon: 'ri-calendar-check-line', message: 'Review Organic Chemistry before Aug 10 — exam pattern suggests 3+ questions.', type: 'info' },
    { icon: 'ri-fire-line', message: '12-day streak! Keep it up to unlock achievement badge.', type: 'streak' }
  ],
  recentActivity: [
    { icon: 'ri-stack-line', text: 'Reviewed 15 Biology flashcards', time: '2 hours ago', color: 'var(--purple)' },
    { icon: 'ri-questionnaire-line', text: 'Completed Physics Quiz — 92%', time: '5 hours ago', color: 'var(--green)' },
    { icon: 'ri-file-text-line', text: 'Generated summary for Chapter 8', time: 'Yesterday', color: 'var(--cyan)' },
    { icon: 'ri-calendar-line', text: 'Updated study plan for next week', time: 'Yesterday', color: 'var(--amber)' }
  ]
};

function initDashboard() {
  // Render weak areas
  const weakAreasList = document.getElementById('weak-areas-list');
  weakAreasList.innerHTML = studyData.weakAreas.map(area => `
    <div class="weak-area-item" style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:14px;font-weight:500;">${area.topic}</span>
          <span style="font-size:13px;color:${area.color};font-weight:600;">${area.score}%</span>
        </div>
        <div style="height:6px;background:var(--surface);border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${area.score}%;background:${area.color};border-radius:3px;transition:width 1s ease;"></div>
        </div>
      </div>
    </div>
  `).join('');

  // Render alerts
  const alertsList = document.getElementById('alerts-list');
  alertsList.innerHTML = studyData.alerts.map(alert => {
    const colors = { warning: 'var(--coral)', success: 'var(--green)', info: 'var(--cyan)', streak: 'var(--amber)' };
    return `
    <div class="alert-card" style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--surface);border-radius:var(--radius-sm);margin-bottom:10px;border-left:3px solid ${colors[alert.type]};">
      <i class="${alert.icon}" style="font-size:20px;color:${colors[alert.type]};margin-top:2px;"></i>
      <span style="font-size:13px;line-height:1.5;color:var(--text-secondary);">${alert.message}</span>
    </div>`;
  }).join('');

  // Render recent activity
  const activityList = document.getElementById('activity-list');
  activityList.innerHTML = studyData.recentActivity.map(act => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:36px;height:36px;border-radius:10px;background:${act.color}20;display:flex;align-items:center;justify-content:center;">
        <i class="${act.icon}" style="color:${act.color};font-size:16px;"></i>
      </div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:500;">${act.text}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${act.time}</div>
      </div>
    </div>
  `).join('');

  // Draw progress chart
  drawProgressChart();
}

function drawProgressChart() {
  const canvas = document.getElementById('progress-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  
  const data = studyData.weeklyProgress;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const barWidth = chartW / data.length * 0.6;
  const gap = chartW / data.length;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
    // Y axis labels
    ctx.fillStyle = '#6b6b8d';
    ctx.font = '11px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`${100 - i * 25}%`, padding.left - 8, y + 4);
  }

  // Bars with gradient
  data.forEach((val, i) => {
    const x = padding.left + gap * i + (gap - barWidth) / 2;
    const barH = (val / 100) * chartH;
    const y = padding.top + chartH - barH;

    // Bar gradient
    const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
    grad.addColorStop(0, '#8b5cf6');
    grad.addColorStop(1, '#06b6d4');
    
    // Bar with rounded top
    ctx.beginPath();
    const r = 4;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barWidth - r, y);
    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
    ctx.lineTo(x + barWidth, padding.top + chartH);
    ctx.lineTo(x, padding.top + chartH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fillStyle = grad;
    ctx.fill();

    // Glow effect
    ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Value on top
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${val}%`, x + barWidth / 2, y - 8);

    // Day label
    ctx.fillStyle = '#6b6b8d';
    ctx.font = '12px Inter';
    ctx.fillText(days[i], x + barWidth / 2, padding.top + chartH + 20);
  });
}

// ===== STUDY GENERATOR =====
const inputTabs = document.querySelectorAll('.input-tab');
const outputTabs = document.querySelectorAll('.output-tab');
let currentInputType = 'text';
let currentOutputFormat = 'summary';

inputTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    inputTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentInputType = tab.dataset.type;
    // Show/hide appropriate input areas
    document.getElementById('text-input-area').classList.toggle('hidden', currentInputType !== 'text');
    document.getElementById('image-input-area').classList.toggle('hidden', currentInputType !== 'image');
    document.getElementById('voice-input-area').classList.toggle('hidden', currentInputType !== 'voice');
  });
});

outputTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    outputTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentOutputFormat = tab.dataset.format;
  });
});

// File upload
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');

if (uploadZone) {
  uploadZone.addEventListener('click', () => fileInput.click());
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = 'var(--purple)';
    uploadZone.style.background = 'var(--surface-hover)';
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = '';
    uploadZone.style.background = '';
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = '';
    uploadZone.style.background = '';
    handleFileUpload(e.dataTransfer.files[0]);
  });
}

if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFileUpload(e.target.files[0]);
  });
}

function handleFileUpload(file) {
  const preview = document.getElementById('image-preview');
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" style="max-width:100%;border-radius:var(--radius-sm);margin-top:12px;">`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `<div style="padding:20px;background:var(--surface);border-radius:var(--radius-sm);margin-top:12px;"><i class="ri-file-line" style="font-size:24px;color:var(--purple);"></i> ${file.name}</div>`;
  }
  showToast(`File uploaded: ${file.name}`);
}

// Voice recording
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

const recordBtn = document.getElementById('record-btn');
if (recordBtn) {
  recordBtn.addEventListener('click', toggleRecording);
}

async function toggleRecording() {
  const voiceStatus = document.getElementById('voice-status');
  if (!isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        voiceStatus.textContent = 'Recording saved. Click Generate to process.';
        showToast('Voice recording captured!');
      };
      mediaRecorder.start();
      isRecording = true;
      recordBtn.classList.add('recording');
      voiceStatus.textContent = 'Recording... Click to stop';
    } catch (err) {
      showToast('Microphone access denied');
    }
  } else {
    mediaRecorder.stop();
    isRecording = false;
    recordBtn.classList.remove('recording');
  }
}

// Generate button
const generateBtn = document.getElementById('generate-btn');
if (generateBtn) {
  generateBtn.addEventListener('click', generateStudyMaterial);
}

async function generateStudyMaterial() {
  const textInput = document.getElementById('text-input');
  const outputDisplay = document.getElementById('output-display');
  const loadingSpinner = document.getElementById('loading-spinner');
  
  let content = '';
  if (currentInputType === 'text') {
    content = textInput.value.trim();
  } else if (currentInputType === 'image') {
    content = 'Uploaded image content (OCR text extraction would be processed here)';
  } else if (currentInputType === 'voice') {
    content = 'Voice recording (speech-to-text would be processed here)';
  }

  if (!content && currentInputType === 'text') {
    showToast('Please enter some study material first!');
    return;
  }

  outputDisplay.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');

  try {
    let result;
    if (ibmService.isConfigured()) {
      // Use IBM watsonx.ai
      let prompt;
      switch (currentOutputFormat) {
        case 'summary': prompt = ibmService.buildSummaryPrompt(content); break;
        case 'flashcards': prompt = ibmService.buildFlashcardsPrompt(content); break;
        case 'concept-map': prompt = ibmService.buildConceptMapPrompt(content); break;
        case 'study-guide': prompt = ibmService.buildStudyGuidePrompt(content); break;
      }
      result = await ibmService.generate(prompt, 2048);
    } else {
      // Use demo/mock data
      await new Promise(r => setTimeout(r, 2000)); // Simulate API call
      result = generateMockOutput(currentOutputFormat, content);
    }

    loadingSpinner.classList.add('hidden');
    outputDisplay.classList.remove('hidden');
    renderOutput(result, currentOutputFormat);
    showToast('Study material generated successfully!');
  } catch (error) {
    loadingSpinner.classList.add('hidden');
    outputDisplay.classList.remove('hidden');
    outputDisplay.innerHTML = `<div class="empty-state" style="color:var(--coral);"><i class="ri-error-warning-line"></i><p>${error.message}</p></div>`;
    showToast('Generation failed. Check settings.');
  }
}

function generateMockOutput(format, content) {
  // Extract first few words for context
  const topic = content.substring(0, 50);
  switch (format) {
    case 'summary':
      return \`## Key Summary\n\n### Main Concepts\n- **Core Principle**: The fundamental concepts covered in this material relate to \${topic}...\n- **Key Definition**: Important terms and definitions are highlighted for quick review\n- **Critical Relationships**: Understanding how these concepts interconnect is essential\n\n### Important Points\n1. Primary concepts establish the foundation for advanced topics\n2. Applications of these principles appear frequently in examinations\n3. Practice problems should focus on conceptual understanding\n\n### Quick Review\n- Focus on understanding rather than memorization\n- Create connections between related topics\n- Review weak areas identified in your dashboard\`;
    case 'flashcards':
      return \`Q: What is the main concept discussed in this material?\nA: The primary concept relates to the fundamental principles and their applications in the given context.\n\nQ: What are the key components to remember?\nA: The key components include core definitions, relationships between concepts, and practical applications.\n\nQ: How does this topic relate to exam preparation?\nA: This topic frequently appears in exams with focus on conceptual understanding and problem-solving.\n\nQ: What is the most important takeaway?\nA: Understanding the underlying principles enables solving a wide range of related problems.\n\nQ: What are common mistakes students make with this topic?\nA: Common mistakes include confusing similar terms, overlooking key relationships, and focusing on memorization over understanding.\`;
    case 'concept-map':
      return \`CONCEPT: Core Theory\nRELATED TO: Fundamental Principles - forms the basis of understanding\n\nCONCEPT: Fundamental Principles\nRELATED TO: Applications - principles are applied in practical scenarios\nRELATED TO: Key Definitions - defined by core terminology\n\nCONCEPT: Applications\nRELATED TO: Problem Solving - used to solve real-world problems\nRELATED TO: Exam Topics - frequently tested in assessments\n\nCONCEPT: Key Definitions\nRELATED TO: Core Theory - essential vocabulary for the field\`;
    case 'study-guide':
      return \`# Comprehensive Study Guide\n\n## Learning Objectives\n1. Understand the fundamental concepts and definitions\n2. Apply principles to solve problems\n3. Analyze relationships between key topics\n4. Evaluate and compare different approaches\n\n## Key Concepts\n\n### Concept 1: Foundations\nThe foundational principles establish the framework for all advanced topics. Understanding these basics is critical for exam success.\n\n### Concept 2: Applications\nPractical applications demonstrate how theoretical knowledge translates to real-world scenarios.\n\n## Important Definitions\n- **Term 1**: Core definition and context\n- **Term 2**: Related concept with examples\n\n## Practice Questions\n1. Explain the relationship between the core concepts\n2. Apply the fundamental principles to a new scenario\n3. Compare and contrast the different approaches discussed\n\n## Quick Review Checklist\n- [ ] Reviewed all key definitions\n- [ ] Completed practice problems\n- [ ] Created summary notes\n- [ ] Identified weak areas for review\`;
  }
}

function renderOutput(result, format) {
  const outputDisplay = document.getElementById('output-display');
  
  if (format === 'flashcards' && result.includes('Q:')) {
    const cards = ibmService.parseFlashcards(result);
    if (cards.length > 0) {
      outputDisplay.innerHTML = \`<h3 style="margin-bottom:16px;font-size:16px;font-weight:600;"><i class="ri-stack-line" style="color:var(--purple);"></i> Generated \${cards.length} Flashcards</h3>\` +
        cards.map((card, i) => \`
          <div class="generated-flashcard" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px 20px;margin-bottom:12px;">
            <div style="font-weight:600;margin-bottom:8px;color:var(--text-primary);font-size:14px;"><span style="color:var(--purple);font-weight:700;">Q\${i+1}:</span> \${card.question}</div>
            <div style="color:var(--text-secondary);font-size:14px;padding-left:12px;border-left:3px solid var(--purple);"><span style="font-weight:600;color:var(--cyan);">A:</span> \${card.answer}</div>
          </div>
        \`).join('') +
        \`<button class="btn-primary" style="margin-top:16px;" onclick="addToFlashcardDeck()"><i class="ri-add-line"></i> Add to Flashcard Deck</button>\`;
      // Store for adding to deck
      window._generatedCards = cards;
      return;
    }
  }

  if (format === 'concept-map' && result.includes('CONCEPT:')) {
    const concepts = [];
    const lines = result.split('\\n');
    let current = null;
    lines.forEach(line => {
      if (line.startsWith('CONCEPT:')) {
        current = { name: line.replace('CONCEPT:', '').trim(), relations: [] };
        concepts.push(current);
      } else if (line.startsWith('RELATED TO:') && current) {
        const parts = line.replace('RELATED TO:', '').trim().split(' - ');
        current.relations.push({ target: parts[0], label: parts[1] || '' });
      }
    });
    
    if (concepts.length > 0) {
      const colors = ['var(--purple)', 'var(--cyan)', 'var(--coral)', 'var(--amber)', 'var(--green)'];
      outputDisplay.innerHTML = \`<h3 style="margin-bottom:16px;font-size:16px;font-weight:600;"><i class="ri-mind-map" style="color:var(--cyan);"></i> Concept Map</h3>
        <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;padding:20px;">
          \${concepts.map((c, i) => \`
            <div style="background:\${colors[i % colors.length]}15;border:1px solid \${colors[i % colors.length]}40;border-radius:var(--radius);padding:20px;min-width:200px;text-align:center;">
              <div style="font-weight:700;font-size:16px;color:\${colors[i % colors.length]};margin-bottom:12px;">\${c.name}</div>
              \${c.relations.map(r => \`<div style="font-size:12px;color:var(--text-secondary);margin-top:6px;">→ \${r.target} <span style="color:var(--text-muted);">(\${r.label})</span></div>\`).join('')}
            </div>
          \`).join('')}
        </div>\`;
      return;
    }
  }

  // Default: render as formatted text
  const html = result
    .replace(/^## (.+)$/gm, '<h2 style="font-size:18px;font-weight:700;margin:20px 0 12px;color:var(--text-primary);">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:15px;font-weight:600;margin:16px 0 8px;color:var(--text-primary);">$1</h3>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:22px;font-weight:700;margin:20px 0 12px;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong style="color:var(--text-primary);">$1</strong>')
    .replace(/^- \\[ \\] (.+)$/gm, '<div style="display:flex;align-items:center;gap:8px;margin:6px 0;"><input type="checkbox" style="accent-color:var(--purple);"> <span>$1</span></div>')
    .replace(/^- (.+)$/gm, '<div style="display:flex;align-items:flex-start;gap:8px;margin:6px 0;font-size:14px;color:var(--text-secondary);"><span style="color:var(--purple);font-weight:bold;">•</span> $1</div>')
    .replace(/^(\\d+)\\. (.+)$/gm, '<div style="display:flex;align-items:flex-start;gap:8px;margin:6px 0;font-size:14px;color:var(--text-secondary);"><span style="color:var(--cyan);font-weight:700;min-width:20px;">$1.</span> $2</div>')
    .replace(/\\n\\n/g, '<br><br>')
    .replace(/\\n/g, '<br>');
  
  outputDisplay.innerHTML = \`<div style="line-height:1.7;">\${html}</div>\`;
}

function addToFlashcardDeck() {
  if (window._generatedCards) {
    // Add to existing flashcard data
    const customCards = window._generatedCards.map(c => ({
      question: c.question,
      answer: c.answer,
      category: 'Generated',
      mastered: false
    }));
    flashcardDecks['Generated'] = (flashcardDecks['Generated'] || []).concat(customCards);
    // Update deck selector
    const selector = document.getElementById('deck-selector');
    if (selector && !Array.from(selector.options).find(o => o.value === 'Generated')) {
      const opt = document.createElement('option');
      opt.value = 'Generated';
      opt.textContent = 'Generated';
      selector.appendChild(opt);
    }
    showToast(\`\${customCards.length} cards added to Generated deck!\`);
  }
}

// ===== FLASHCARDS =====
const flashcardDecks = {
  'Biology': [
    { question: 'What is the powerhouse of the cell?', answer: 'The mitochondria is the powerhouse of the cell. It generates ATP through cellular respiration.', category: 'Biology', mastered: false },
    { question: 'What is the difference between DNA and RNA?', answer: 'DNA is double-stranded, contains deoxyribose sugar and thymine. RNA is single-stranded, contains ribose sugar and uracil.', category: 'Biology', mastered: false },
    { question: 'What is photosynthesis?', answer: 'Photosynthesis is the process by which green plants convert light energy into chemical energy (glucose), using CO2 and H2O, releasing O2.', category: 'Biology', mastered: true },
    { question: 'What are the phases of mitosis?', answer: 'Prophase, Metaphase, Anaphase, and Telophase (PMAT). Each phase involves specific chromosome behaviors.', category: 'Biology', mastered: false },
    { question: 'What is natural selection?', answer: 'Natural selection is the process where organisms with favorable traits are more likely to survive and reproduce, driving evolution.', category: 'Biology', mastered: false }
  ],
  'Physics': [
    { question: 'What is Newton\\'s Second Law?', answer: 'F = ma. The net force on an object equals its mass times its acceleration.', category: 'Physics', mastered: false },
    { question: 'What is the speed of light in vacuum?', answer: 'Approximately 3 × 10⁸ m/s (299,792,458 m/s exactly).', category: 'Physics', mastered: true },
    { question: 'What is the Heisenberg Uncertainty Principle?', answer: 'You cannot simultaneously know the exact position and momentum of a particle. Δx·Δp ≥ ℏ/2', category: 'Physics', mastered: false },
    { question: 'What is Ohm\\'s Law?', answer: 'V = IR. Voltage equals current times resistance in a circuit.', category: 'Physics', mastered: false }
  ],
  'Computer Science': [
    { question: 'What is Big O notation?', answer: 'Big O notation describes the upper bound of an algorithm\\'s time/space complexity as input size grows.', category: 'CS', mastered: false },
    { question: 'What is a binary search tree?', answer: 'A BST is a tree data structure where each node has at most two children, with left child < parent < right child.', category: 'CS', mastered: true },
    { question: 'What is the difference between stack and queue?', answer: 'Stack: LIFO (Last In, First Out). Queue: FIFO (First In, First Out).', category: 'CS', mastered: false },
    { question: 'What is recursion?', answer: 'Recursion is when a function calls itself to solve a smaller instance of the same problem, with a base case to stop.', category: 'CS', mastered: false }
  ],
  'Mathematics': [
    { question: 'What is the derivative of sin(x)?', answer: 'cos(x). The derivative gives the rate of change of the sine function.', category: 'Math', mastered: false },
    { question: 'What is the Pythagorean theorem?', answer: 'a² + b² = c², where c is the hypotenuse of a right triangle.', category: 'Math', mastered: true },
    { question: 'What is a matrix determinant?', answer: 'A scalar value that can be computed from a square matrix and encodes properties of the linear transformation.', category: 'Math', mastered: false }
  ]
};

let currentDeck = 'Biology';
let currentCardIndex = 0;
let isFlipped = false;

function initFlashcards() {
  const deckSelector = document.getElementById('deck-selector');
  if (deckSelector) {
    deckSelector.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'All Decks') {
        // Combine all decks
        currentDeck = 'All Decks';
      } else {
        currentDeck = val;
      }
      currentCardIndex = 0;
      isFlipped = false;
      renderFlashcard();
    });
  }

  document.getElementById('prev-card')?.addEventListener('click', () => {
    const cards = getCurrentCards();
    if (currentCardIndex > 0) {
      currentCardIndex--;
      isFlipped = false;
      renderFlashcard();
    }
  });

  document.getElementById('next-card')?.addEventListener('click', () => {
    const cards = getCurrentCards();
    if (currentCardIndex < cards.length - 1) {
      currentCardIndex++;
      isFlipped = false;
      renderFlashcard();
    }
  });

  document.getElementById('flip-card')?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    document.querySelector('.flashcard')?.classList.toggle('flipped', isFlipped);
  });

  document.querySelector('.flashcard')?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    document.querySelector('.flashcard')?.classList.toggle('flipped', isFlipped);
  });

  document.getElementById('mark-known')?.addEventListener('click', () => {
    const cards = getCurrentCards();
    if (cards[currentCardIndex]) {
      cards[currentCardIndex].mastered = true;
      showToast('Marked as mastered! 🎉');
      updateMasteryBar();
      // Auto-advance
      if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        isFlipped = false;
        renderFlashcard();
      }
    }
  });

  document.getElementById('mark-unknown')?.addEventListener('click', () => {
    const cards = getCurrentCards();
    if (cards[currentCardIndex]) {
      cards[currentCardIndex].mastered = false;
      showToast('Keep studying! 💪');
      updateMasteryBar();
      if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        isFlipped = false;
        renderFlashcard();
      }
    }
  });

  renderFlashcard();
}

function getCurrentCards() {
  if (currentDeck === 'All Decks') {
    return Object.values(flashcardDecks).flat();
  }
  return flashcardDecks[currentDeck] || [];
}

function renderFlashcard() {
  const cards = getCurrentCards();
  if (cards.length === 0) return;
  const card = cards[currentCardIndex];
  
  const frontContent = document.querySelector('.card-front .card-content');
  const backAnswer = document.querySelector('.card-back .card-answer');
  const category = document.querySelector('.card-category');
  const counter = document.getElementById('card-counter');
  
  if (frontContent) frontContent.textContent = card.question;
  if (backAnswer) backAnswer.textContent = card.answer;
  if (category) category.textContent = card.category;
  if (counter) counter.textContent = \`\${currentCardIndex + 1} / \${cards.length}\`;
  
  document.querySelector('.flashcard')?.classList.remove('flipped');
  isFlipped = false;
  updateMasteryBar();
}

function updateMasteryBar() {
  const cards = getCurrentCards();
  const mastered = cards.filter(c => c.mastered).length;
  const pct = Math.round((mastered / cards.length) * 100);
  const fill = document.getElementById('mastery-fill');
  const label = document.getElementById('mastery-label');
  if (fill) fill.style.width = \`\${pct}%\`;
  if (label) label.textContent = \`\${pct}% Mastered\`;
}

// ===== QUIZ =====
const quizQuestions = {
  'General': [
    { question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1, explanation: 'A stack uses Last In, First Out (LIFO) principle. The last element added is the first one removed.' },
    { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2, explanation: 'Binary search has O(log n) time complexity because it halves the search space with each comparison.' },
    { question: 'Which organelle is responsible for photosynthesis?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'], correct: 2, explanation: 'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.' },
    { question: 'What is the derivative of x²?', options: ['x', '2x', '2x²', 'x³/3'], correct: 1, explanation: 'Using the power rule, d/dx(x²) = 2x.' },
    { question: 'What is Newton\\'s First Law also known as?', options: ['Law of Acceleration', 'Law of Inertia', 'Law of Action-Reaction', 'Law of Gravity'], correct: 1, explanation: 'Newton\\'s First Law is the Law of Inertia: an object at rest stays at rest, and an object in motion stays in motion unless acted upon by a net force.' },
    { question: 'What is the pH of pure water?', options: ['0', '7', '14', '1'], correct: 1, explanation: 'Pure water has a pH of 7, which is neutral on the pH scale.' },
    { question: 'Which sorting algorithm has the best average time complexity?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], correct: 2, explanation: 'Merge Sort has O(n log n) average time complexity, which is better than O(n²) of Bubble, Selection, and Insertion sort.' },
    { question: 'What is the chemical formula for glucose?', options: ['C6H12O6', 'C2H5OH', 'NaCl', 'H2SO4'], correct: 0, explanation: 'Glucose has the molecular formula C₆H₁₂O₆. It is a simple sugar and primary energy source for cells.' },
    { question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2, explanation: 'World War II ended in 1945 with the surrender of Germany in May and Japan in September.' },
    { question: 'What is the integral of 1/x?', options: ['x²', 'ln|x| + C', '1/x²', 'e^x'], correct: 1, explanation: 'The integral of 1/x is ln|x| + C, where C is the constant of integration.' }
  ],
  'Biology': [
    { question: 'What is the basic unit of life?', options: ['Atom', 'Molecule', 'Cell', 'Organ'], correct: 2, explanation: 'The cell is the basic structural and functional unit of all living organisms.' },
    { question: 'Which molecule carries genetic information?', options: ['RNA', 'DNA', 'Protein', 'Lipid'], correct: 1, explanation: 'DNA (Deoxyribonucleic acid) carries the genetic instructions for development and functioning of organisms.' },
    { question: 'What process converts glucose to energy?', options: ['Photosynthesis', 'Fermentation', 'Cellular Respiration', 'Digestion'], correct: 2, explanation: 'Cellular respiration converts glucose and oxygen into ATP, CO2, and water.' },
    { question: 'How many chromosomes do humans have?', options: ['23', '46', '44', '48'], correct: 1, explanation: 'Humans have 46 chromosomes (23 pairs) in most body cells.' },
    { question: 'What is the function of ribosomes?', options: ['Energy production', 'Protein synthesis', 'DNA replication', 'Cell division'], correct: 1, explanation: 'Ribosomes are the sites of protein synthesis, translating mRNA into amino acid sequences.' }
  ],
  'Physics': [
    { question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correct: 2, explanation: 'The Newton (N) is the SI unit of force. 1 N = 1 kg⋅m/s².' },
    { question: 'What is the formula for kinetic energy?', options: ['mgh', '½mv²', 'Fd', 'mc²'], correct: 1, explanation: 'Kinetic energy KE = ½mv², where m is mass and v is velocity.' },
    { question: 'What type of wave is sound?', options: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Surface'], correct: 1, explanation: 'Sound is a longitudinal wave where particles vibrate parallel to the direction of wave propagation.' },
    { question: 'What is the unit of electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2, explanation: 'Electrical resistance is measured in Ohms (Ω). R = V/I according to Ohm\\'s Law.' },
    { question: 'What is the acceleration due to gravity on Earth?', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '11.2 m/s²'], correct: 1, explanation: 'The standard acceleration due to gravity on Earth is approximately 9.8 m/s² (or 9.81 m/s² more precisely).' }
  ],
  'Computer Science': [
    { question: 'What does CPU stand for?', options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility'], correct: 1, explanation: 'CPU stands for Central Processing Unit, the primary component that executes instructions.' },
    { question: 'Which of these is NOT a programming paradigm?', options: ['Object-Oriented', 'Functional', 'Procedural', 'Mechanical'], correct: 3, explanation: 'Mechanical is not a programming paradigm. The main paradigms are OOP, Functional, Procedural, and Declarative.' },
    { question: 'What is the worst-case time complexity of quicksort?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correct: 2, explanation: 'Quicksort\\'s worst-case is O(n²), occurring when the pivot selection is poor (e.g., already sorted array).' },
    { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Question Language', 'System Query Logic'], correct: 0, explanation: 'SQL stands for Structured Query Language, used for managing and querying relational databases.' },
    { question: 'What is a hash table\\'s average lookup time?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correct: 2, explanation: 'Hash tables provide O(1) average-case lookup time through direct addressing via hash functions.' }
  ],
  'Mathematics': [
    { question: 'What is the value of π (pi) to 2 decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correct: 0, explanation: 'π ≈ 3.14159... which rounds to 3.14 at two decimal places.' },
    { question: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correct: 2, explanation: '√144 = 12, since 12 × 12 = 144.' },
    { question: 'What is a prime number?', options: ['Divisible by 2', 'Has exactly 2 factors', 'An odd number', 'Greater than 10'], correct: 1, explanation: 'A prime number is a natural number greater than 1 that has exactly two factors: 1 and itself.' },
    { question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'The sum of interior angles of any triangle is always 180 degrees.' },
    { question: 'What is log₂(8)?', options: ['2', '3', '4', '8'], correct: 1, explanation: 'log₂(8) = 3, because 2³ = 8.' }
  ]
};

let currentQuizTopic = 'General';
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswer = -1;
let quizScore = 0;
let quizTimer = null;
let quizTimeLeft = 30;
let quizStartTime = null;

function initQuiz() {
  document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
  document.getElementById('submit-answer-btn')?.addEventListener('click', submitAnswer);
  document.getElementById('next-question-btn')?.addEventListener('click', nextQuestion);
  document.getElementById('retake-quiz-btn')?.addEventListener('click', retakeQuiz);
}

function startQuiz() {
  const topic = document.getElementById('quiz-topic-select').value;
  const difficulty = document.getElementById('quiz-difficulty').value;
  const count = parseInt(document.getElementById('quiz-count').value);

  currentQuizTopic = topic;
  
  // Check if IBM is configured for dynamic quiz generation
  if (ibmService.isConfigured()) {
    generateAIQuiz(topic, difficulty, count);
    return;
  }

  // Use pre-built questions
  let pool = quizQuestions[topic] || quizQuestions['General'];
  // Shuffle and take requested count
  currentQuizQuestions = shuffleArray([...pool]).slice(0, Math.min(count, pool.length));
  currentQuestionIndex = 0;
  selectedAnswer = -1;
  quizScore = 0;
  quizStartTime = Date.now();

  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-area').classList.remove('hidden');

  renderQuestion();
}

async function generateAIQuiz(topic, difficulty, count) {
  showToast('Generating AI quiz questions...');
  try {
    const prompt = ibmService.buildQuizPrompt(topic, difficulty, count);
    const result = await ibmService.generate(prompt, 2048);
    const parsed = ibmService.parseQuizQuestions(result);
    if (parsed.length > 0) {
      currentQuizQuestions = parsed;
      currentQuestionIndex = 0;
      selectedAnswer = -1;
      quizScore = 0;
      quizStartTime = Date.now();
      document.getElementById('quiz-setup').classList.add('hidden');
      document.getElementById('quiz-results').classList.add('hidden');
      document.getElementById('quiz-area').classList.remove('hidden');
      renderQuestion();
    } else {
      showToast('Failed to parse quiz questions. Using built-in questions.');
      startQuiz(); // Fallback
    }
  } catch (error) {
    showToast('AI quiz generation failed. Using built-in questions.');
    // Reset IBM config check and use local
    currentQuizQuestions = shuffleArray([...(quizQuestions[topic] || quizQuestions['General'])]).slice(0, parseInt(document.getElementById('quiz-count').value));
    currentQuestionIndex = 0;
    selectedAnswer = -1;
    quizScore = 0;
    quizStartTime = Date.now();
    document.getElementById('quiz-setup').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    renderQuestion();
  }
}

function renderQuestion() {
  const q = currentQuizQuestions[currentQuestionIndex];
  const total = currentQuizQuestions.length;

  // Progress
  document.getElementById('quiz-progress-fill').style.width = \`\${((currentQuestionIndex) / total) * 100}%\`;
  document.getElementById('quiz-progress-text').textContent = \`Question \${currentQuestionIndex + 1} of \${total}\`;

  // Timer
  quizTimeLeft = 30;
  updateTimerDisplay();
  clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    quizTimeLeft--;
    updateTimerDisplay();
    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      submitAnswer();
    }
  }, 1000);

  // Question
  document.getElementById('quiz-question-text').textContent = q.question;

  // Options
  const optionsContainer = document.getElementById('quiz-options');
  const letters = ['A', 'B', 'C', 'D'];
  optionsContainer.innerHTML = q.options.map((opt, i) => \`
    <button class="quiz-option" data-index="\${i}" onclick="selectQuizOption(\${i})">
      <span class="option-letter">\${letters[i]}</span>
      <span>\${opt}</span>
    </button>
  \`).join('');

  // Reset buttons
  selectedAnswer = -1;
  document.getElementById('submit-answer-btn').classList.remove('hidden');
  document.getElementById('submit-answer-btn').disabled = true;
  document.getElementById('next-question-btn').classList.add('hidden');
  document.getElementById('quiz-explanation').classList.add('hidden');
}

function updateTimerDisplay() {
  const display = document.getElementById('quiz-timer-display');
  const seconds = quizTimeLeft;
  const color = seconds <= 10 ? 'var(--coral)' : seconds <= 20 ? 'var(--amber)' : 'var(--text-secondary)';
  display.innerHTML = \`<i class="ri-timer-line"></i> 00:\${seconds.toString().padStart(2, '0')}\`;
  display.style.color = color;
}

function selectQuizOption(index) {
  selectedAnswer = index;
  document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
  document.querySelector(\`.quiz-option[data-index="\${index}"]\`).classList.add('selected');
  document.getElementById('submit-answer-btn').disabled = false;
}
// Make it globally accessible
window.selectQuizOption = selectQuizOption;

function submitAnswer() {
  clearInterval(quizTimer);
  const q = currentQuizQuestions[currentQuestionIndex];
  
  // Show correct/incorrect
  document.querySelectorAll('.quiz-option').forEach(opt => {
    const idx = parseInt(opt.dataset.index);
    opt.style.pointerEvents = 'none';
    if (idx === q.correct) opt.classList.add('correct');
    if (idx === selectedAnswer && idx !== q.correct) opt.classList.add('incorrect');
  });

  if (selectedAnswer === q.correct) {
    quizScore++;
    showToast('Correct! 🎉');
  } else if (selectedAnswer === -1) {
    showToast('Time\\'s up! ⏰');
  } else {
    showToast('Incorrect ❌');
  }

  // Show explanation
  const explanation = document.getElementById('quiz-explanation');
  explanation.classList.remove('hidden');
  explanation.innerHTML = \`<i class="ri-lightbulb-line" style="color:var(--amber);"></i> <strong>Explanation:</strong> \${q.explanation}\`;

  // Toggle buttons
  document.getElementById('submit-answer-btn').classList.add('hidden');
  if (currentQuestionIndex < currentQuizQuestions.length - 1) {
    document.getElementById('next-question-btn').classList.remove('hidden');
  } else {
    // Show results after delay
    setTimeout(showQuizResults, 1500);
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  renderQuestion();
}

function showQuizResults() {
  document.getElementById('quiz-area').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const total = currentQuizQuestions.length;
  const pct = Math.round((quizScore / total) * 100);
  const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  document.getElementById('quiz-final-score').textContent = \`\${pct}%\`;
  
  // Update stats display
  const statsRow = document.querySelector('.quiz-stats-row');
  if (statsRow) {
    statsRow.innerHTML = \`
      <div class="quiz-stat"><div class="quiz-stat-value" style="color:var(--green);">\${quizScore}</div><div class="quiz-stat-label">Correct</div></div>
      <div class="quiz-stat"><div class="quiz-stat-value" style="color:var(--coral);">\${total - quizScore}</div><div class="quiz-stat-label">Incorrect</div></div>
      <div class="quiz-stat"><div class="quiz-stat-value" style="color:var(--cyan);">\${mins}:\${secs.toString().padStart(2, '0')}</div><div class="quiz-stat-label">Time Taken</div></div>
    \`;
  }

  // Update dashboard stats
  studyData.avgQuizScore = Math.round((studyData.avgQuizScore + pct) / 2);
  const quizScoreEl = document.getElementById('stat-quiz-score');
  if (quizScoreEl) quizScoreEl.textContent = \`\${studyData.avgQuizScore}%\`;
}

function retakeQuiz() {
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-setup').classList.remove('hidden');
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== PLANNER =====
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const plannerTasks = {
  '2026-08-01': [{ subject: 'Biology - Cell Structure', time: '9:00 AM', priority: 'high' }],
  '2026-08-02': [{ subject: 'Physics - Mechanics', time: '10:00 AM', priority: 'medium' }],
  '2026-08-03': [{ subject: 'Math - Calculus Review', time: '9:00 AM', priority: 'high' }, { subject: 'CS - Data Structures', time: '2:00 PM', priority: 'medium' }],
  '2026-08-05': [{ subject: 'Chemistry - Organic', time: '11:00 AM', priority: 'high' }],
  '2026-08-06': [{ subject: 'Physics - Thermodynamics', time: '9:00 AM', priority: 'medium' }],
  '2026-08-08': [{ subject: 'Biology - Genetics', time: '10:00 AM', priority: 'high' }],
  '2026-08-10': [{ subject: 'Math - Linear Algebra', time: '9:00 AM', priority: 'medium' }],
  '2026-08-12': [{ subject: 'Full Practice Test', time: '9:00 AM', priority: 'high' }],
  '2026-08-14': [{ subject: 'Revision - All Subjects', time: '8:00 AM', priority: 'high' }]
};

function initPlanner() {
  renderCalendar();
  renderTodayTasks();
  renderRecommendations();
  renderTopicPriorities();
  updateExamCountdown();

  document.querySelector('.month-nav .nav-prev')?.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  document.querySelector('.month-nav .nav-next')?.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  document.getElementById('generate-plan-btn')?.addEventListener('click', generateAIPlan);
}

function renderCalendar() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('current-month').textContent = \`\${monthNames[currentMonth]} \${currentYear}\`;

  const container = document.getElementById('calendar-days');
  container.innerHTML = '';

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const today = new Date();

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.className = 'calendar-day other-month';
    day.textContent = daysInPrevMonth - i;
    container.appendChild(day);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement('div');
    day.className = 'calendar-day';
    day.textContent = d;

    const dateStr = \`\${currentYear}-\${String(currentMonth + 1).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`;
    if (plannerTasks[dateStr]) {
      day.classList.add('has-tasks');
    }
    if (d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      day.classList.add('today');
    }

    day.addEventListener('click', () => {
      document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
      day.classList.add('selected');
      showDayTasks(dateStr);
    });

    container.appendChild(day);
  }

  // Next month days to fill grid
  const totalCells = firstDay + daysInMonth;
  const remaining = 7 - (totalCells % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const day = document.createElement('div');
      day.className = 'calendar-day other-month';
      day.textContent = i;
      container.appendChild(day);
    }
  }
}

function showDayTasks(dateStr) {
  const container = document.getElementById('today-tasks');
  const tasks = plannerTasks[dateStr];
  if (tasks && tasks.length > 0) {
    container.innerHTML = \`<h4 style="font-size:14px;font-weight:600;margin-bottom:12px;">\${dateStr}</h4>\` +
      tasks.map(t => \`
        <div class="plan-item">
          <div class="plan-priority \${t.priority}"></div>
          <div><div class="plan-subject">\${t.subject}</div></div>
          <div class="plan-time">\${t.time}</div>
        </div>
      \`).join('');
  } else {
    container.innerHTML = \`<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;"><i class="ri-calendar-line" style="font-size:24px;display:block;margin-bottom:8px;"></i>No tasks for this day</div>\`;
  }
}

function renderTodayTasks() {
  const today = new Date();
  const dateStr = \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, '0')}-\${String(today.getDate()).padStart(2, '0')}\`;
  showDayTasks(dateStr);
}

function renderRecommendations() {
  const container = document.getElementById('recommended-plan');
  const recs = [
    { subject: 'Quantum Mechanics Review', time: '2 hours', priority: 'high', reason: 'Weakest area — exam probability: 78%' },
    { subject: 'Organic Chemistry Practice', time: '1.5 hours', priority: 'high', reason: 'Below target score — needs 15% improvement' },
    { subject: 'Linear Algebra Problems', time: '1 hour', priority: 'medium', reason: 'Good foundation — focus on eigenvalues' },
    { subject: 'Biology Flashcard Review', time: '30 min', priority: 'low', reason: 'Strong area — maintenance review' }
  ];

  container.innerHTML = recs.map(r => \`
    <div class="plan-item">
      <div class="plan-priority \${r.priority}"></div>
      <div style="flex:1;">
        <div class="plan-subject">\${r.subject}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">\${r.reason}</div>
      </div>
      <div class="plan-time">\${r.time}</div>
    </div>
  \`).join('');
}

function renderTopicPriorities() {
  const container = document.getElementById('topic-priorities');
  const topics = [
    { name: 'Quantum Mechanics', pct: 85, color: 'var(--coral)' },
    { name: 'Organic Chemistry', pct: 72, color: 'var(--amber)' },
    { name: 'Linear Algebra', pct: 60, color: 'var(--cyan)' },
    { name: 'Data Structures', pct: 45, color: 'var(--purple)' },
    { name: 'Cell Biology', pct: 30, color: 'var(--green)' }
  ];

  container.innerHTML = topics.map(t => \`
    <div class="priority-item" style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <span style="font-size:13px;font-weight:500;min-width:130px;">\${t.name}</span>
      <div class="priority-bar-container" style="flex:1;height:8px;background:var(--surface);border-radius:4px;overflow:hidden;">
        <div class="priority-bar" style="height:100%;width:\${t.pct}%;background:\${t.color};border-radius:4px;"></div>
      </div>
      <span style="font-size:12px;color:var(--text-muted);min-width:30px;text-align:right;">\${t.pct}%</span>
    </div>
  \`).join('');
}

function updateExamCountdown() {
  const examDate = new Date('2026-08-15');
  const today = new Date();
  const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('days-remaining');
  if (el) el.textContent = \`\${diff} days\`;
}

async function generateAIPlan() {
  if (!ibmService.isConfigured()) {
    showToast('Configure IBM watsonx.ai in Settings for AI-generated plans');
    return;
  }
  showToast('Generating AI study plan...');
  try {
    const topics = ['Quantum Mechanics', 'Organic Chemistry', 'Linear Algebra', 'Data Structures', 'Cell Biology'];
    const weakAreas = ['Quantum Mechanics', 'Organic Chemistry'];
    const prompt = ibmService.buildStudyPlanPrompt(topics, '2026-08-15', weakAreas);
    const result = await ibmService.generate(prompt, 2048);
    const container = document.getElementById('recommended-plan');
    container.innerHTML = \`<div style="line-height:1.7;font-size:14px;color:var(--text-secondary);white-space:pre-wrap;">\${result}</div>\`;
    showToast('AI study plan generated!');
  } catch (error) {
    showToast('Failed to generate plan: ' + error.message);
  }
}

// ===== SETTINGS =====
function initSettings() {
  // Load saved settings
  document.getElementById('ibm-api-key-input').value = localStorage.getItem('ibm_api_key') || '';
  document.getElementById('ibm-url-input').value = localStorage.getItem('ibm_api_url') || 'https://us-south.ml.cloud.ibm.com';
  document.getElementById('ibm-project-id-input').value = localStorage.getItem('ibm_project_id') || '';
  document.getElementById('ibm-model-select').value = localStorage.getItem('ibm_model_id') || 'ibm/granite-13b-chat-v2';

  document.getElementById('save-settings-btn')?.addEventListener('click', () => {
    const apiKey = document.getElementById('ibm-api-key-input').value;
    const apiUrl = document.getElementById('ibm-url-input').value;
    const projectId = document.getElementById('ibm-project-id-input').value;
    const modelId = document.getElementById('ibm-model-select').value;
    ibmService.saveSettings(apiKey, apiUrl, projectId, modelId);
    showToast('Settings saved successfully! ✓');
  });

  document.getElementById('test-connection-btn')?.addEventListener('click', async () => {
    const status = document.getElementById('connection-status');
    status.innerHTML = '<span style="color:var(--text-muted);">Testing connection...</span>';
    status.className = '';
    
    // Save current values first
    const apiKey = document.getElementById('ibm-api-key-input').value;
    const apiUrl = document.getElementById('ibm-url-input').value;
    const projectId = document.getElementById('ibm-project-id-input').value;
    const modelId = document.getElementById('ibm-model-select').value;
    ibmService.saveSettings(apiKey, apiUrl, projectId, modelId);

    const result = await ibmService.testConnection();
    if (result.success) {
      status.innerHTML = \`<i class="ri-checkbox-circle-line"></i> \${result.message}\`;
      status.className = 'success';
      showToast('Connection successful! ✓');
    } else {
      status.innerHTML = \`<i class="ri-error-warning-line"></i> \${result.message}\`;
      status.className = 'error';
      showToast('Connection failed. Check your credentials.');
    }
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initFlashcards();
  initQuiz();
  initPlanner();
  initSettings();
  
  // Resize handler for chart
  window.addEventListener('resize', () => {
    drawProgressChart();
  });

  // Check IBM configuration
  if (!ibmService.isConfigured()) {
    console.log('IBM watsonx.ai not configured. Using demo mode.');
  }
});
