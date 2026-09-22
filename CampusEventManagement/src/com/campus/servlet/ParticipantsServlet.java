package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.dao.RegistrationDAO;
import com.campus.model.Event;
import com.campus.model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/admin/participants")
public class ParticipantsServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();
    private RegistrationDAO registrationDAO = new RegistrationDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int eventId = Integer.parseInt(request.getParameter("eventId"));
            Event event = eventDAO.getEventById(eventId);
            List<Student> participants = registrationDAO.getParticipants(eventId);

            request.setAttribute("event", event);
            request.setAttribute("participants", participants);

            request.getRequestDispatcher("/WEB-INF/views/participants.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        }
    }
}
