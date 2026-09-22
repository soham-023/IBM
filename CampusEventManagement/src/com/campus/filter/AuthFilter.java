package com.campus.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/*")
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String uri = req.getRequestURI();
        HttpSession session = req.getSession(false);

        if (uri.contains("/student/")) {
            if (session == null || session.getAttribute("student") == null) {
                res.sendRedirect(req.getContextPath() + "/login");
                return;
            }
        } else if (uri.contains("/admin/") && !uri.contains("/admin-login")) {
            if (session == null || session.getAttribute("admin") == null) {
                res.sendRedirect(req.getContextPath() + "/admin-login");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
