<%@ page import="com.campus.model.Event" %>
<%@ include file="header.jsp" %>

<div class="page-header">
    <h1>Edit Event</h1>
    <p class="subtitle text-secondary">Update event details</p>
</div>

<div class="card mx-auto" style="max-width: 700px;">
    <% if(request.getAttribute("error") != null) { %>
        <div class="alert alert-error"><%= request.getAttribute("error") %></div>
    <% } %>

    <% Event ev = (Event) request.getAttribute("event"); %>
    <% if(ev != null) { %>
    <form action="${pageContext.request.contextPath}/admin/update-event" method="POST">
        <input type="hidden" name="id" value="<%= ev.getId() %>">
        
        <div class="form-group">
            <label for="title">Event Title</label>
            <input type="text" id="title" name="title" value="<%= ev.getTitle() %>" required>
        </div>
        
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" required><%= ev.getDescription() %></textarea>
        </div>
        
        <div style="display: flex; gap: 20px;">
            <div class="form-group" style="flex: 1;">
                <label for="eventDate">Date</label>
                <input type="date" id="eventDate" name="eventDate" value="<%= ev.getEventDate() %>" required>
            </div>
            <div class="form-group" style="flex: 1;">
                <label for="eventTime">Time</label>
                <input type="text" id="eventTime" name="eventTime" value="<%= ev.getEventTime() %>" required>
            </div>
        </div>
        
        <div style="display: flex; gap: 20px;">
            <div class="form-group" style="flex: 1;">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="Technology" <%= "Technology".equals(ev.getCategory()) ? "selected" : "" %>>Technology</option>
                    <option value="Cultural" <%= "Cultural".equals(ev.getCategory()) ? "selected" : "" %>>Cultural</option>
                    <option value="Sports" <%= "Sports".equals(ev.getCategory()) ? "selected" : "" %>>Sports</option>
                    <option value="Workshop" <%= "Workshop".equals(ev.getCategory()) ? "selected" : "" %>>Workshop</option>
                    <option value="Seminar" <%= "Seminar".equals(ev.getCategory()) ? "selected" : "" %>>Seminar</option>
                    <option value="Career" <%= "Career".equals(ev.getCategory()) ? "selected" : "" %>>Career</option>
                    <option value="Other" <%= "Other".equals(ev.getCategory()) ? "selected" : "" %>>Other</option>
                </select>
            </div>
            <div class="form-group" style="flex: 1;">
                <label for="maxParticipants">Max Participants</label>
                <input type="number" id="maxParticipants" name="maxParticipants" value="<%= ev.getMaxParticipants() %>" min="1" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="venue">Venue</label>
            <input type="text" id="venue" name="venue" value="<%= ev.getVenue() %>" required>
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button type="submit" class="btn btn-primary">Update Event</button>
            <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
    <% } else { %>
        <div class="alert alert-error">Event not found.</div>
        <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-primary">Back to Dashboard</a>
    <% } %>
</div>

<%@ include file="footer.jsp" %>
