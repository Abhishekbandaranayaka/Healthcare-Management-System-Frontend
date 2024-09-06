// src/components/AppointmentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAppointment.css';

const AppointmentForm = ({ appointmentId, onClose }) => {
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [status, setStatus] = useState('Scheduled');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (appointmentId) {
            // Fetch existing appointment data if appointmentId is provided
            const fetchAppointment = async () => {
                try {
                    const response = await axios.get(`http://localhost:8082/api/appointments/${appointmentId}`);
                    const appointment = response.data;
                    setPatientId(appointment.patientId);
                    setDoctorId(appointment.doctorId);
                    setAppointmentDate(appointment.appointmentDate);
                    setStatus(appointment.status);
                } catch (error) {
                    console.error('Error fetching appointment:', error);
                    setMessage('Failed to fetch appointment.');
                }
            };

            fetchAppointment();
        }
    }, [appointmentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (appointmentId) {
                // Update existing appointment
                await axios.put(`http://localhost:8082/api/appointments/update/${appointmentId}`, {
                    patientId,
                    doctorId,
                    appointmentDate,
                    status,
                });
                setMessage('Appointment updated successfully.');
            } else {
                // Create new appointment
                await axios.post('http://localhost:8082/api/appointments/create', {
                    patientId,
                    doctorId,
                    appointmentDate,
                    status,
                });
                setMessage('Appointment created successfully.');
            }
            if (onClose) onClose(); // Close the form after submission
        } catch (error) {
            console.error('Error submitting appointment:', error);
            setMessage('Failed to submit appointment.');
        }
    };

    return (
        <div className="create-appointment">
            <h2>{appointmentId ? 'Update Appointment' : 'Create Appointment'}</h2>
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
                    <label>Doctor ID:</label>
                    <input
                        type="number"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Appointment Date:</label>
                    <input
                        type="datetime-local"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <button type="submit">{appointmentId ? 'Update Appointment' : 'Create Appointment'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AppointmentForm;
