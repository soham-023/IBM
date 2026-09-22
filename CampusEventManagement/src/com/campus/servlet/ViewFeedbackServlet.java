package com.campus.servlet;

import com.campus.dao.EventDAO;
import com.campus.dao.FeedbackDAO;
import com.campus.model.Event;
import com.campus.model.Feedback;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/admin/view-feedback")
public class ViewFeedbackServlet extends HttpServlet {
    private EventDAO eventDAO = new EventDAO();
    private FeedbackDAO feedbackDAO = new FeedbackDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String eventIdParam = request.getParameter("eventId");

            if (eventIdParam != null && !eventIdParam.trim().isEmpty()) {
                int eventId = Integer.parseInt(eventIdParam);
                Event event = eventDAO.getEventById(eventId);
                List<Feedback> feedbacks = feedbackDAO.getFeedbackByEvent(eventId);
                double averageRating = feedbackDAO.getAverageRating(eventId);

                request.setAttribute("event", event);
                request.setAttribute("feedbacks", feedbacks);
                request.setAttribute("averageRating", averageRating);
            } else {
                List<Feedback> feedbacks = feedbackDAO.getAllFeedback();
                request.setAttribute("feedbacks", feedbacks);
            }

            request.getRequestDispatcher("/WEB-INF/views/view-feedback.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
        }
    }
}
