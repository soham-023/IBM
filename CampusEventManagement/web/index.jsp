<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Campus Event Management System</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
    <div class="hero">
        <div class="hero-content">
            <h1>Campus Event Management System</h1>
            <p class="subtitle">Discover, Register, and Participate in Amazing Campus Events</p>
            <div class="btn-group mt-20">
                <a href="${pageContext.request.contextPath}/login" class="btn btn-hero btn-primary">Student Login</a>
                <a href="${pageContext.request.contextPath}/admin-login" class="btn btn-hero btn-secondary" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.5);">Admin Login</a>
            </div>
        </div>
    </div>

    <div class="container mt-20" style="padding-top: 60px; padding-bottom: 60px;">
        <h2 class="text-center mb-20">Platform Features</h2>
        <div class="features-grid">
            <div class="feature-card card">
                <h3>Browse Events</h3>
                <p class="text-secondary mt-20">Discover technical, cultural, and sports events happening around the campus.</p>
            </div>
            <div class="feature-card card">
                <h3>Easy Registration</h3>
                <p class="text-secondary mt-20">Register for events with a single click and manage your participations effortlessly.</p>
            </div>
            <div class="feature-card card">
                <h3>Give Feedback</h3>
                <p class="text-secondary mt-20">Share your thoughts and help organizers improve future events by providing feedback.</p>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>&copy; 2026 Campus Event Management System</p>
    </footer>
    <script src="${pageContext.request.contextPath}/js/script.js"></script>
</body>
</html>
