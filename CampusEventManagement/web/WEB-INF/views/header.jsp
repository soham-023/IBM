<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Campus Events</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<nav class="navbar">
    <a href="${pageContext.request.contextPath}/" class="logo">Campus Events</a>
    <div class="nav-links">
        <% if (session.getAttribute("student") != null) { %>
            <a href="${pageContext.request.contextPath}/student/events">Events</a>
            <a href="${pageContext.request.contextPath}/student/my-events">My Events</a>
            <a href="${pageContext.request.contextPath}/logout">Logout</a>
        <% } else if (session.getAttribute("admin") != null) { %>
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a>
            <a href="${pageContext.request.contextPath}/admin/add-event">Add Event</a>
            <a href="${pageContext.request.contextPath}/admin/view-feedback">View Feedback</a>
            <a href="${pageContext.request.contextPath}/logout">Logout</a>
        <% } else { %>
            <a href="${pageContext.request.contextPath}/login">Login</a>
            <a href="${pageContext.request.contextPath}/register">Register</a>
        <% } %>
    </div>
</nav>
<div class="container">
