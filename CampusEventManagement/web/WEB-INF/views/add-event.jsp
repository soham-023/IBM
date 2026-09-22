<%@ include file="header.jsp" %>

<div class="page-header">
    <h1>Add New Event</h1>
    <p class="subtitle text-secondary">Create a new event for students to register</p>
</div>

<div class="card mx-auto" style="max-width: 700px;">
    <% if(request.getAttribute("error") != null) { %>
        <div class="alert alert-error"><%= request.getAttribute("error") %></div>
    <% } %>

    <form action="${pageContext.request.contextPath}/admin/add-event" method="POST">
        <div class="form-group">
            <label for="title">Event Title</label>
            <input type="text" id="title" name="title" required placeholder="e.g. Annual Tech Symposium">
        </div>
        
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" required placeholder="Detailed description of the event..."></textarea>
        </div>
        
        <div style="display: flex; gap: 20px;">
            <div class="form-group" style="flex: 1;">
                <label for="eventDate">Date</label>
                <input type="date" id="eventDate" name="eventDate" required>
            </div>
            <div class="form-group" style="flex: 1;">
                <label for="eventTime">Time</label>
                <input type="text" id="eventTime" name="eventTime" required placeholder="e.g. 10:00 AM">
            </div>
        </div>
        
        <div style="display: flex; gap: 20px;">
            <div class="form-group" style="flex: 1;">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Career">Career</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group" style="flex: 1;">
                <label for="maxParticipants">Max Participants</label>
                <input type="number" id="maxParticipants" name="maxParticipants" min="1" required placeholder="e.g. 100">
            </div>
        </div>
        
        <div class="form-group">
            <label for="venue">Venue</label>
            <input type="text" id="venue" name="venue" required placeholder="e.g. Main Auditorium">
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button type="submit" class="btn btn-primary">Create Event</button>
            <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<%@ include file="footer.jsp" %>
