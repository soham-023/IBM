CREATE DATABASE IF NOT EXISTS campus_events;
USE campus_events;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time VARCHAR(20),
    venue VARCHAR(200),
    category VARCHAR(50),
    max_participants INT DEFAULT 100,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admins(id)
);

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, event_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Seed default admin
INSERT INTO admins (username, password, name) VALUES ('admin', 'admin123', 'Administrator');

-- Seed sample events
INSERT INTO events (title, description, event_date, event_time, venue, category, max_participants, created_by) VALUES
('Tech Fest 2026', 'Annual technology festival with coding competitions and workshops', '2026-09-15', '09:00 AM', 'Main Auditorium', 'Technology', 200, 1),
('Cultural Night', 'Evening of dance, music, and drama performances', '2026-09-20', '06:00 PM', 'Open Air Theatre', 'Cultural', 500, 1),
('Career Fair', 'Meet recruiters from top companies', '2026-10-01', '10:00 AM', 'Convention Center', 'Career', 300, 1),
('Sports Day', 'Inter-department sports competition', '2026-10-10', '08:00 AM', 'Sports Complex', 'Sports', 400, 1),
('Workshop: AI & ML', 'Hands-on workshop on Artificial Intelligence', '2026-09-25', '02:00 PM', 'CS Lab 101', 'Workshop', 50, 1);
