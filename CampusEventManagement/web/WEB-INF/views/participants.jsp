<%@ page import="java.util.*, com.campus.model.*" %>
<%@ include file="header.jsp" %>

<% Event ev = (Event) request.getAttribute("event"); %>
<div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
        <h1>Participants</h1>
        <p class="subtitle text-secondary">
            For Event: <span style="font-weight: 600; color: #4f46e5;"><%= ev != null ? ev.getTitle() : "Unknown Event" %></span>
        </p>
    </div>
    <a href="${pageContext.request.contextPath}/admin/dashboard" class="btn btn-secondary">Back to Dashboard</a>
</div>

<div class="card" style="padding: 0; overflow: hidden;">
    <%
        List<Student> participants = (List<Student>) request.getAttribute("participants");
        if (participants != null && !participants.isEmpty()) {
    %>
    <div style="overflow-x: auto;">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <% 
                   int count = 1;
                   for(Student st : participants) { 
                %>
                <tr>
                    <td style="color: #64748b;"><%= count++ %></td>
                    <td style="font-weight: 600;"><%= st.getName() %></td>
                    <td><a href="mailto:<%= st.getEmail() %>" style="color: #4f46e5; text-decoration: none;"><%= st.getEmail() %></a></td>
                    <td><span class="category-badge badge-other"><%= st.getDepartment() %></span></td>
                    <td><%= st.getPhone() %></td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
    <% } else { %>
        <div class="empty-state">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">&#128101;</div>
            <h4>No Participants Yet</h4>
            <p style="margin-top: 10px;">Students haven't registered for this event yet.</p>
        </div>
    <% } %>
</div>

<%@ include file="footer.jsp" %>
