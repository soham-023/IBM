<%@ page import="java.util.*, com.campus.model.*" %>
<%@ include file="header.jsp" %>

<div class="page-header">
    <h1>Upcoming Events</h1>
    <p class="subtitle text-secondary">Discover and register for campus events</p>
</div>

<% if(request.getAttribute("error") != null) { %>
    <div class="alert alert-error"><%= request.getAttribute("error") %></div>
<% } %>
<% if(request.getAttribute("success") != null) { %>
    <div class="alert alert-success"><%= request.getAttribute("success") %></div>
<% } %>

<div class="search-bar">
    <form action="${pageContext.request.contextPath}/student/search" method="GET" style="display: flex; width: 100%; gap: 10px;">
        <input type="text" name="keyword" placeholder="Search events by title, venue, or category..." value="${param.keyword}" required>
        <button type="submit" class="btn btn-primary">Search</button>
        <% if(request.getParameter("keyword") != null && !request.getParameter("keyword").isEmpty()) { %>
            <a href="${pageContext.request.contextPath}/student/events" class="btn btn-secondary">Clear</a>
        <% } %>
    </form>
</div>

<%
    List<Event> events = (List<Event>) request.getAttribute("events");
    Map<Integer, Boolean> regStatus = (Map<Integer, Boolean>) request.getAttribute("registrationStatus");
    Map<Integer, Integer> regCounts = (Map<Integer, Integer>) request.getAttribute("registrationCounts");
    
    if (events != null && !events.isEmpty()) {
%>
    <div class="events-grid">
        <% for(Event ev : events) { 
            boolean isRegistered = regStatus != null && regStatus.containsKey(ev.getId()) ? regStatus.get(ev.getId()) : false;
            int count = regCounts != null && regCounts.containsKey(ev.getId()) ? regCounts.get(ev.getId()) : 0;
            String catClass = "badge-other";
            String cat = ev.getCategory().toLowerCase();
            if(cat.contains("tech")) catClass = "badge-tech";
            else if(cat.contains("cult")) catClass = "badge-cultural";
            else if(cat.contains("sport")) catClass = "badge-sports";
            else if(cat.contains("work")) catClass = "badge-workshop";
        %>
        <div class="event-card">
            <div class="event-header">
                <span class="category-badge <%= catClass %>"><%= ev.getCategory() %></span>
            </div>
            <div class="event-body">
                <h3 class="event-title"><%= ev.getTitle() %></h3>
                <p class="text-secondary mb-20" style="font-size: 0.95rem; height: 40px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"><%= ev.getDescription() %></p>
                <div class="event-meta mb-20">
                    <span>&#128197; <%= ev.getEventDate() %></span>
                    <span>&#128338; <%= ev.getEventTime() %></span>
                    <span style="width: 100%; margin-top: 5px;">&#128205; <%= ev.getVenue() %></span>
                </div>
            </div>
            <div class="event-actions">
                <div class="registration-info">
                    <%= count %> / <%= ev.getMaxParticipants() %> filled
                </div>
                <div>
                    <% if(isRegistered) { %>
                        <button class="btn btn-secondary btn-sm" disabled>Registered</button>
                    <% } else if(count >= ev.getMaxParticipants()) { %>
                        <button class="btn btn-danger btn-sm" disabled>Full</button>
                    <% } else { %>
                        <form action="${pageContext.request.contextPath}/student/register-event" method="POST" style="margin:0;">
                            <input type="hidden" name="eventId" value="<%= ev.getId() %>">
                            <button type="submit" class="btn btn-primary btn-sm">Register</button>
                        </form>
                    <% } %>
                </div>
            </div>
        </div>
        <% } %>
    </div>
<% } else { %>
    <div class="empty-state">
        <div style="font-size: 3rem; margin-bottom: 15px;">&#128269;</div>
        <h3>No events found</h3>
        <p>Try adjusting your search criteria or check back later.</p>
    </div>
<% } %>

<%@ include file="footer.jsp" %>
