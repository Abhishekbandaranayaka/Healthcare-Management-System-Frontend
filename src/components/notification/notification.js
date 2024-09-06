import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './notification.css';

// URL for fetching notifications
const API_URL = 'http://localhost:8086/api/notifications/list';

const Notification = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // State to track which notification is expanded

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const response = await axios.get(API_URL);
                const sortedNotifications = response.data.sort((a, b) => new Date(b.notificationDate) - new Date(a.notificationDate));
                setNotifications(sortedNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        loadNotifications();
    }, []); // Empty dependency array means this effect runs only once

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
        const message = notification.message || ""; // Access the message property if notification is an object
        if (message.includes("registration")) return "#a8aaa9";
        if (message.includes("logged in")) return "#a8aaa9";
        if (message.includes("Payment Successful")) return "#a8aaa9";
        if (message.includes("Don’t Miss Out")) return "#a8aaa9";
        if (message.includes("Reminder")) return "#a8aaa9";
        if (message.includes("Update Successful")) return "#a8aaa9";
        if (message.includes("Password Changed")) return "#a8aaa9";
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
                                    <div><strong>Patient ID:</strong> {notification.patientId}</div>
                                    <div>{notification.message}</div>
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
