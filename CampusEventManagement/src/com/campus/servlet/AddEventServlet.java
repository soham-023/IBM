package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.model.Admin;
import com.campus.model.Event;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Date;

@WebServlet("/admin/add-event")
public class AddEventServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/views/add-event.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        try {
            HttpSession session = request.getSession();
            Admin admin = (Admin) session.getAttribute("admin");

            if (admin != null) {
                Event event = new Event();
                event.setTitle(request.getParameter("title"));
                event.setDescription(request.getParameter("description"));
                event.setEventDate(Date.valueOf(request.getParameter("eventDate")));
                event.setEventTime(request.getParameter("eventTime"));
                event.setVenue(request.getParameter("venue"));
                event.setCategory(request.getParameter("category"));
                event.setMaxParticipants(Integer.parseInt(request.getParameter("maxParticipants")));
                event.setCreatedBy(admin.getId());

                eventDAO.addEvent(event);
                response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            } else {
                response.sendRedirect(request.getContextPath() + "/admin-login");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        }
    }
}
