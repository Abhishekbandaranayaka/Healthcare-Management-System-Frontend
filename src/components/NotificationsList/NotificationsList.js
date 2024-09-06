import React, { useEffect, useState } from 'react';
import { listNotifications } from './notificationService';

const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await listNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>Notifications List</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.notificationId}>
                        <p><strong>ID:</strong> {notification.notificationId}</p>
                        <p><strong>Patient ID:</strong> {notification.patientId}</p>
                        <p><strong>Message:</strong> {notification.message}</p>
                        <p><strong>Date:</strong> {new Date(notification.notificationDate).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsList;
