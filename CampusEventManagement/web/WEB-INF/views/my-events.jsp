<%@ page import="java.util.*, com.campus.model.*" %>
<%@ include file="header.jsp" %>

<div class="page-header">
    <h1>My Registered Events</h1>
    <p class="subtitle text-secondary">Manage your event participations and provide feedback</p>
</div>

<% if(request.getAttribute("error") != null) { %>
    <div class="alert alert-error"><%= request.getAttribute("error") %></div>
<% } %>
<% if(request.getAttribute("success") != null) { %>
    <div class="alert alert-success"><%= request.getAttribute("success") %></div>
<% } %>

<%
    List<Event> registeredEvents = (List<Event>) request.getAttribute("registeredEvents");
    if (registeredEvents != null && !registeredEvents.isEmpty()) {
%>
    <div class="card" style="padding: 0; overflow: hidden;">
        <table>
            <thead>
                <tr>
                    <th>Event Title</th>
                    <th>Category</th>
                    <th>Date & Time</th>
                    <th>Venue</th>
                    <th style="text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <% for(Event ev : registeredEvents) { %>
                <tr>
                    <td style="font-weight: 600;"><%= ev.getTitle() %></td>
                    <td><span class="category-badge badge-other"><%= ev.getCategory() %></span></td>
                    <td><%= ev.getEventDate() %><br><span style="font-size: 0.85rem; color: #64748b;"><%= ev.getEventTime() %></span></td>
                    <td><%= ev.getVenue() %></td>
                    <td style="text-align: center; display: flex; justify-content: center; gap: 8px;">
                        <a href="${pageContext.request.contextPath}/student/feedback?eventId=<%= ev.getId() %>" class="btn btn-secondary btn-sm">Feedback</a>
                        <form action="${pageContext.request.contextPath}/student/cancel-registration" method="POST" style="margin: 0;" onsubmit="return confirmCancel('<%= ev.getTitle().replace("'", "\\'") %>');">
                            <input type="hidden" name="eventId" value="<%= ev.getId() %>">
                            <button type="submit" class="btn btn-danger btn-sm">Cancel</button>
                        </form>
                    </td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
<% } else { %>
    <div class="empty-state card">
        <div style="font-size: 3rem; margin-bottom: 15px;">&#128197;</div>
        <h3>No Registered Events</h3>
        <p>You haven't registered for any events yet.</p>
        <a href="${pageContext.request.contextPath}/student/events" class="btn btn-primary mt-20">Browse Events</a>
    </div>
<% } %>

<%@ include file="footer.jsp" %>
