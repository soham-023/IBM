<%@ page import="java.util.*, com.campus.model.*" %>
<%@ include file="header.jsp" %>

<div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
        <h1>Admin Dashboard</h1>
        <p class="subtitle text-secondary">Manage events and monitor registrations</p>
    </div>
    <a href="${pageContext.request.contextPath}/admin/add-event" class="btn btn-primary">+ Add New Event</a>
</div>

<% if(request.getAttribute("error") != null) { %>
    <div class="alert alert-error"><%= request.getAttribute("error") %></div>
<% } %>
<% if(request.getAttribute("success") != null) { %>
    <div class="alert alert-success"><%= request.getAttribute("success") %></div>
<% } %>

<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-value">${totalEvents != null ? totalEvents : 0}</div>
        <div class="stat-label">Total Events</div>
    </div>
    <div class="stat-card">
        <div class="stat-value">${totalStudents != null ? totalStudents : 0}</div>
        <div class="stat-label">Registered Students</div>
    </div>
    <div class="stat-card">
        <div class="stat-value">${totalRegistrations != null ? totalRegistrations : 0}</div>
        <div class="stat-label">Total Participations</div>
    </div>
</div>

<div class="card" style="padding: 0; overflow: hidden; margin-top: 30px;">
    <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; background: #fafafa;">
        <h3 style="margin: 0;">Manage Events</h3>
    </div>
    <%
        List<Event> recentEvents = (List<Event>) request.getAttribute("recentEvents");
        if (recentEvents != null && !recentEvents.isEmpty()) {
    %>
    <div style="overflow-x: auto;">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date & Time</th>
                    <th>Venue</th>
                    <th style="text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <% for(Event ev : recentEvents) { %>
                <tr>
                    <td style="font-weight: 600;"><%= ev.getTitle() %></td>
                    <td><span class="category-badge badge-other"><%= ev.getCategory() %></span></td>
                    <td><%= ev.getEventDate() %><br><span style="font-size: 0.85rem; color: #64748b;"><%= ev.getEventTime() %></span></td>
                    <td><%= ev.getVenue() %></td>
                    <td style="text-align: center;">
                        <div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">
                            <a href="${pageContext.request.contextPath}/admin/participants?eventId=<%= ev.getId() %>" class="btn btn-secondary btn-sm" title="Participants">&#128101;</a>
                            <a href="${pageContext.request.contextPath}/admin/view-feedback?eventId=<%= ev.getId() %>" class="btn btn-secondary btn-sm" title="Feedback">&#128172;</a>
                            <a href="${pageContext.request.contextPath}/admin/update-event?id=<%= ev.getId() %>" class="btn btn-primary btn-sm" title="Edit">&#9998;</a>
                            <form action="${pageContext.request.contextPath}/admin/delete-event" method="POST" style="margin: 0;" onsubmit="return confirmDelete('<%= ev.getTitle().replace("'", "\\'") %>');">
                                <input type="hidden" name="id" value="<%= ev.getId() %>">
                                <button type="submit" class="btn btn-danger btn-sm" title="Delete">&#128465;</button>
                            </form>
                        </div>
                    </td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
    <% } else { %>
        <div class="empty-state">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">&#128197;</div>
            <h4>No Events Found</h4>
            <p style="margin-top: 10px;">Create your first event to get started.</p>
        </div>
    <% } %>
</div>

<%@ include file="footer.jsp" %>
