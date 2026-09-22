<%@ include file="header.jsp" %>

<div class="auth-container">
    <div class="auth-card card">
        <h2 class="text-center mb-20">Student Login</h2>
        
        <% if(request.getAttribute("error") != null) { %>
            <div class="alert alert-error"><%= request.getAttribute("error") %></div>
        <% } %>
        <% if(request.getAttribute("success") != null) { %>
            <div class="alert alert-success"><%= request.getAttribute("success") %></div>
        <% } %>

        <form action="${pageContext.request.contextPath}/login" method="POST">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
        </form>
        
        <div class="text-center mt-20" style="font-size: 0.9rem;">
            <p><a href="${pageContext.request.contextPath}/register" style="color: #4f46e5; text-decoration: none;">Don't have an account? Register here</a></p>
            <p class="mt-20"><a href="${pageContext.request.contextPath}/admin-login" style="color: #64748b; text-decoration: none;">Login as Admin</a></p>
        </div>
    </div>
</div>

<%@ include file="footer.jsp" %>
