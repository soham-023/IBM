package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.dao.RegistrationDAO;
import com.campus.dao.StudentDAO;
import com.campus.model.Event;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/admin/dashboard")
public class AdminDashboardServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();
    private RegistrationDAO registrationDAO = new RegistrationDAO();
    private StudentDAO studentDAO = new StudentDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int totalEvents = eventDAO.getEventCount();
            int totalStudents = studentDAO.getStudentCount();
            int totalRegistrations = registrationDAO.getTotalRegistrations();
            List<Event> recentEvents = eventDAO.getUpcomingEvents();

            request.setAttribute("totalEvents", totalEvents);
            request.setAttribute("totalStudents", totalStudents);
            request.setAttribute("totalRegistrations", totalRegistrations);
            request.setAttribute("recentEvents", recentEvents);

            request.getRequestDispatcher("/WEB-INF/views/admin-dashboard.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
