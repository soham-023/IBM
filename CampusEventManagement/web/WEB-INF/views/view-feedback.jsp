<%@ page import="java.util.*, com.campus.model.*" %>
<%@ include file="header.jsp" %>

<% Event ev = (Event) request.getAttribute("event"); %>
<div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
        <h1>Event Feedback</h1>
        <% if(ev != null) { %>
            <p class="subtitle text-secondary">
                For Event: <span style="font-weight: 600; color: #4f46e5;"><%= ev.getTitle() %></span>
                <% if(request.getAttribute("avgRating") != null) { %>
                    <span style="margin-left: 15px; background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 20px; font-weight: 600;">
                        &#11088; <%= String.format("%.1f", request.getAttribute("avgRating")) %> / 5.0
                    </span>
                <% } %>
            </p>
        <% } else { %>
            <p class="subtitle text-secondary">Viewing all feedback</p>
        <% } %>
    </div>
    <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-secondary">Back to Dashboard</a>
</div>

<div class="card" style="padding: 0; overflow: hidden;">
    <%
        List<Feedback> feedbacks = (List<Feedback>) request.getAttribute("feedbacks");
        if (feedbacks != null && !feedbacks.isEmpty()) {
    %>
    <div style="overflow-x: auto;">
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <% if(ev == null) { %> <th>Event</th> <% } %>
                    <th>Rating</th>
                    <th style="width: 40%;">Comments</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <% for(Feedback f : feedbacks) { %>
                <tr>
                    <td style="font-weight: 600;"><%= f.getStudentName() != null ? f.getStudentName() : "Unknown" %></td>
                    <% if(ev == null) { %> <td><%= f.getEventTitle() != null ? f.getEventTitle() : "Unknown" %></td> <% } %>
                    <td class="rating-stars" style="font-size: 1.1rem;">
                        <% for(int i=0; i<f.getRating(); i++) out.print("&#11088;"); %>
                    </td>
                    <td style="color: #475569; font-style: italic;">"<%= f.getComments() %>"</td>
                    <td style="font-size: 0.9rem; color: #64748b;"><%= f.getSubmittedAt() != null ? new java.text.SimpleDateFormat("MMM dd, yyyy").format(f.getSubmittedAt()) : "" %></td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
    <% } else { %>
        <div class="empty-state">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">&#128172;</div>
            <h4>No Feedback Available</h4>
            <p style="margin-top: 10px;">No feedback has been submitted for this event yet.</p>
        </div>
    <% } %>
</div>

<%@ include file="footer.jsp" %>
