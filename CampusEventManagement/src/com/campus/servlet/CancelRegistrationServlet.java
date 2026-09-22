package com.campus.servlet;

import com.campus.dao.RegistrationDAO;
import com.campus.model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/student/cancel-registration")
public class CancelRegistrationServlet extends HttpServlet {
    private RegistrationDAO registrationDAO = new RegistrationDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        try {
            int eventId = Integer.parseInt(request.getParameter("eventId"));
            HttpSession session = request.getSession();
            Student student = (Student) session.getAttribute("student");

            if (student != null) {
                registrationDAO.cancel(student.getId(), eventId);
            }
            response.sendRedirect(request.getContextPath() + "/student/my-events");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/student/my-events");
        }
    }
}
