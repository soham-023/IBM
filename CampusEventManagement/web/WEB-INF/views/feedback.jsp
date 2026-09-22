<%@ page import="com.campus.model.*" %>
<%@ include file="header.jsp" %>

<div class="page-header">
    <h1>Event Feedback</h1>
    <p class="subtitle text-secondary">We value your opinion!</p>
</div>

<div class="auth-container" style="align-items: flex-start;">
    <div class="auth-card card" style="max-width: 600px;">
        <% Event eventObj = (Event) request.getAttribute("event"); %>
        
        <h3 class="mb-20">Feedback for: <span style="color: #4f46e5;"><%= eventObj != null ? eventObj.getTitle() : "Event" %></span></h3>
        
        <% if(request.getAttribute("error") != null) { %>
            <div class="alert alert-error"><%= request.getAttribute("error") %></div>
        <% } %>

        <form action="${pageContext.request.contextPath}/student/feedback" method="POST">
            <input type="hidden" name="eventId" value="<%= request.getParameter("eventId") %>">
            
            <div class="form-group">
                <label>Rating (1-5)</label>
                <div style="display: flex; gap: 15px; margin-top: 10px; font-size: 1.2rem;" class="rating-stars">
                    <label style="display: inline; font-weight: normal; color: #1e293b;"><input type="radio" name="rating" value="1" required> &#11088; 1</label>
                    <label style="display: inline; font-weight: normal; color: #1e293b;"><input type="radio" name="rating" value="2"> &#11088; 2</label>
                    <label style="display: inline; font-weight: normal; color: #1e293b;"><input type="radio" name="rating" value="3" checked> &#11088; 3</label>
                    <label style="display: inline; font-weight: normal; color: #1e293b;"><input type="radio" name="rating" value="4"> &#11088; 4</label>
                    <label style="display: inline; font-weight: normal; color: #1e293b;"><input type="radio" name="rating" value="5"> &#11088; 5</label>
                </div>
            </div>
            
            <div class="form-group mt-20">
                <label for="comments">Your Comments</label>
                <textarea id="comments" name="comments" rows="5" required placeholder="Tell us what you liked and how we can improve..."></textarea>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button type="submit" class="btn btn-primary">Submit Feedback</button>
                <a href="${pageContext.request.contextPath}/student/my-events" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>

<%@ include file="footer.jsp" %>
