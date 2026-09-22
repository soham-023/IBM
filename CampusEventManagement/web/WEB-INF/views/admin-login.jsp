<%@ include file="header.jsp" %>

<div class="auth-container">
    <div class="auth-card card">
        <div class="text-center mb-20" style="font-size: 3rem; color: #4f46e5;">&#128119;</div>
        <h2 class="text-center mb-20">Admin Login</h2>
        
        <% if(request.getAttribute("error") != null) { %>
            <div class="alert alert-error"><%= request.getAttribute("error") %></div>
        <% } %>

        <form action="${pageContext.request.contextPath}/admin-login" method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
        </form>
        
        <div class="text-center mt-20" style="font-size: 0.9rem;">
            <p><a href="${pageContext.request.contextPath}/login" style="color: #64748b; text-decoration: none;">Login as Student</a></p>
        </div>
    </div>
</div>

<%@ include file="footer.jsp" %>
