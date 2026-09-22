package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.model.Event;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;

@WebServlet("/admin/update-event")
public class UpdateEventServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int id = Integer.parseInt(request.getParameter("id"));
            Event event = eventDAO.getEventById(id);
            request.setAttribute("event", event);
            request.getRequestDispatcher("/WEB-INF/views/edit-event.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        try {
            Event event = new Event();
            event.setId(Integer.parseInt(request.getParameter("id")));
            event.setTitle(request.getParameter("title"));
            event.setDescription(request.getParameter("description"));
            event.setEventDate(Date.valueOf(request.getParameter("eventDate")));
            event.setEventTime(request.getParameter("eventTime"));
            event.setVenue(request.getParameter("venue"));
            event.setCategory(request.getParameter("category"));
            event.setMaxParticipants(Integer.parseInt(request.getParameter("maxParticipants")));

            eventDAO.updateEvent(event);
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        }
    }
}
