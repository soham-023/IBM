// Campus Event Management System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    if (alerts.length > 0) {
        setTimeout(function() {
            alerts.forEach(function(alert) {
                alert.style.transition = 'opacity 0.5s ease';
                alert.style.opacity = '0';
                setTimeout(function() {
                    alert.style.display = 'none';
                }, 500);
            });
        }, 5000);
    }
    
    // Simple form validation for dates and numbers
    const eventForm = document.querySelector('form[action*="add-event"], form[action*="update-event"]');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            const dateInput = document.getElementById('eventDate');
            if (dateInput) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Commented out the date check so admins can create past events for testing
                // if (selectedDate < today) {
                //     e.preventDefault();
                //     alert('Event date cannot be in the past.');
                //     dateInput.focus();
                // }
            }
        });
    }
});

// Confirmation dialog for deleting an event
function confirmDelete(eventTitle) {
    return confirm('Are you sure you want to delete "' + eventTitle + '"?\nThis action cannot be undone and will remove all associated registrations and feedback.');
}

// Confirmation dialog for canceling a registration
function confirmCancel(eventTitle) {
    return confirm('Are you sure you want to cancel your registration for "' + eventTitle + '"?');
}
