import React, { useState } from 'react';
import './notification.css';

const Notification = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [notifications, setNotifications] = useState([
        "Welcome to Lifeline Healthcare! Your registration was successful. You can now log in and start exploring our services.",
        "✅ You’re logged in! Welcome back to Lifeline Healthcare.",
        "Payment Successful! Your transaction was completed. Thank you for choosing Lifeline Healthcare.",
        "💡 Don’t Miss Out! Special offers are now live. Log in to see how you can save on your next appointment.",
        "⏰ Reminder: You have an upcoming appointment with Lifeline Healthcare. See your schedule for details.",
        "✔️ Update Successful! Your profile details have been saved.",
        "🔐 Password Changed Successfully! You can now use your new password to log in."
    ]);
    const [expandedIndex, setExpandedIndex] = useState(null); // State to track which notification is expanded

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleExpandNotification = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index); // Toggle expand/collapse
    };

    const getBackgroundColor = (notification) => {
        if (notification.includes("registration")) return "#a8aaa9";
        if (notification.includes("logged in")) return "#a8aaa9";
        if (notification.includes("Payment Successful")) return "#a8aaa9";
        if (notification.includes("Don’t Miss Out")) return "#a8aaa9";
        if (notification.includes("Reminder")) return "#a8aaa9";
        if (notification.includes("Update Successful")) return "#a8aaa9";
        if (notification.includes("Password Changed")) return "#a8aaa9";
        return "#a8aaa9";
    };

    return (
        <>
            {showNotification && (
                <div className="notification-popup">
                    <div className="notification-header">
                        <h2>NOTIFICATIONS</h2>
                        <button className="close-btn" onClick={handleCloseNotification}>&times;</button>
                    </div>
                    <div className="notification-body">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className={`notification-item ${expandedIndex === index ? 'expanded' : ''}`}
                                    style={{ backgroundColor: getBackgroundColor(notification) }}
                                    onClick={() => handleExpandNotification(index)}
                                >
                                    {notification}
                                </div>
                            ))
                        ) : (
                            <p>No new notifications</p>
                        )}
                    </div>
                    <div className="notification-footer">
                        <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;
