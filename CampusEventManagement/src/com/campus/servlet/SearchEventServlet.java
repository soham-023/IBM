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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/student/search")
public class SearchEventServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();
    private RegistrationDAO registrationDAO = new RegistrationDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String keyword = request.getParameter("keyword");
        if (keyword == null || keyword.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/student/events");
            return;
        }

        try {
            List<Event> events = eventDAO.searchEvents(keyword);
            HttpSession session = request.getSession();
            Student student = (Student) session.getAttribute("student");
            int studentId = student != null ? student.getId() : -1;

            Map<Integer, Boolean> registrationStatus = new HashMap<>();
            Map<Integer, Integer> registrationCounts = new HashMap<>();

            for (Event event : events) {
                if (studentId != -1) {
                    registrationStatus.put(event.getId(), registrationDAO.isRegistered(studentId, event.getId()));
                }
                registrationCounts.put(event.getId(), registrationDAO.getRegistrationCount(event.getId()));
            }

            request.setAttribute("events", events);
            request.setAttribute("registrationStatus", registrationStatus);
            request.setAttribute("registrationCounts", registrationCounts);
            request.setAttribute("keyword", keyword);

            request.getRequestDispatcher("/WEB-INF/views/events.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
