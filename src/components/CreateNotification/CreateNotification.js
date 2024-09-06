import React, { useState } from 'react';
import axios from 'axios';
import './CreateNotification.css'; // Make sure to create this CSS file for styling

const CreateNotificationForm = () => {
    const [patientId, setPatientId] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8086/api/notifications/send', null, {
                params: {
                    patientId,
                    message
                }
            });
            setResponseMessage(response.data);
            setIsError(false);
        } catch (error) {
            setResponseMessage('Error sending notification');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Notification</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient ID:</label>
                    <input
                        type="number"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Send Notification</button>
            </form>
            {responseMessage && (
                <p className={`message ${isError ? 'error' : 'success'}`}>{responseMessage}</p>
            )}
        </div>
    );
};

export default CreateNotificationForm;
