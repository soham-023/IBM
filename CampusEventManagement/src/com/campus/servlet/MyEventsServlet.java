package com.campus.servlet;

import com.campus.dao.RegistrationDAO;
import com.campus.model.Event;
import com.campus.model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/student/my-events")
public class MyEventsServlet extends HttpServlet {
    private RegistrationDAO registrationDAO = new RegistrationDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            Student student = (Student) session.getAttribute("student");

            if (student != null) {
                List<Event> registeredEvents = registrationDAO.getRegisteredEvents(student.getId());
                request.setAttribute("registeredEvents", registeredEvents);
                request.getRequestDispatcher("/WEB-INF/views/my-events.jsp").forward(request, response);
            } else {
                response.sendRedirect(request.getContextPath() + "/login");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
