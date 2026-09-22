package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.dao.FeedbackDAO;
import com.campus.model.Event;
import com.campus.model.Feedback;
import com.campus.model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;

@WebServlet("/student/feedback")
public class FeedbackServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();
    private FeedbackDAO feedbackDAO = new FeedbackDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int eventId = Integer.parseInt(request.getParameter("eventId"));
            Event event = eventDAO.getEventById(eventId);
            request.setAttribute("event", event);
            request.getRequestDispatcher("/WEB-INF/views/feedback.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/student/my-events");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        try {
            int eventId = Integer.parseInt(request.getParameter("eventId"));
            int rating = Integer.parseInt(request.getParameter("rating"));
            String comments = request.getParameter("comments");

            HttpSession session = request.getSession();
            Student student = (Student) session.getAttribute("student");

            if (student != null) {
                Feedback feedback = new Feedback();
                feedback.setStudentId(student.getId());
                feedback.setEventId(eventId);
                feedback.setRating(rating);
                feedback.setComments(comments);
                feedback.setSubmittedAt(new Timestamp(System.currentTimeMillis()));

                feedbackDAO.submitFeedback(feedback);
                response.sendRedirect(request.getContextPath() + "/student/my-events");
            } else {
                response.sendRedirect(request.getContextPath() + "/login");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/student/my-events");
        }
    }
}
