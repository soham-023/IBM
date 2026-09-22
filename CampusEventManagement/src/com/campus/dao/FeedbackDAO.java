package com.campus.dao;

import com.campus.model.Feedback;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FeedbackDAO {

    public boolean submitFeedback(Feedback feedback) {
        String sql = "INSERT INTO feedback (student_id, event_id, rating, comments) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, feedback.getStudentId());
            ps.setInt(2, feedback.getEventId());
            ps.setInt(3, feedback.getRating());
            ps.setString(4, feedback.getComments());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Feedback> getFeedbackByEvent(int eventId) {
        List<Feedback> feedbacks = new ArrayList<>();
        String sql = "SELECT f.*, s.name as student_name, e.title as event_title " +
                     "FROM feedback f JOIN students s ON f.student_id = s.id " +
                     "JOIN events e ON f.event_id = e.id WHERE f.event_id=? ORDER BY f.submitted_at DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, eventId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Feedback fb = extractFeedbackWithTransients(rs);
                    feedbacks.add(fb);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return feedbacks;
    }

    public double getAverageRating(int eventId) {
        String sql = "SELECT AVG(rating) FROM feedback WHERE event_id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, eventId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getDouble(1);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0.0;
    }

    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbacks = new ArrayList<>();
        String sql = "SELECT f.*, s.name as student_name, e.title as event_title " +
                     "FROM feedback f JOIN students s ON f.student_id = s.id " +
                     "JOIN events e ON f.event_id = e.id ORDER BY f.submitted_at DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                feedbacks.add(extractFeedbackWithTransients(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return feedbacks;
    }
    
    private Feedback extractFeedbackWithTransients(ResultSet rs) throws SQLException {
        Feedback fb = new Feedback();
        fb.setId(rs.getInt("id"));
        fb.setStudentId(rs.getInt("student_id"));
        fb.setEventId(rs.getInt("event_id"));
        fb.setRating(rs.getInt("rating"));
        fb.setComments(rs.getString("comments"));
        fb.setSubmittedAt(rs.getTimestamp("submitted_at"));
        
        fb.setStudentName(rs.getString("student_name"));
        fb.setEventTitle(rs.getString("event_title"));
        return fb;
    }
}
