import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppointmentList.css';
import AppointmentForm from '../Appintment-doctor/CreateAppointment'; // Import the AppointmentForm component

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [doctorIdSearch, setDoctorIdSearch] = useState(''); // Search state

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/appointments');
                if (Array.isArray(response.data)) {
                    setAppointments(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching appointments:', err.response || err.message || err);
                setError('Error fetching appointments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleEditAppointment = (appointment) => {
        setCurrentAppointment(appointment);
        setShowEditAppointmentModal(true);
    };

    const handleSubmit = () => {
        setShowEditAppointmentModal(true); // Show the form modal
    };

    const handleDeleteAppointment = async () => {
        try {
            await axios.delete(`http://localhost:8082/api/appointments/delete/${appointmentToDelete}`);
            setAppointments(appointments.filter(app => app.id !== appointmentToDelete));
            setShowDeleteConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const confirmDelete = (id) => {
        setAppointmentToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Filter appointments by doctorId
    const filteredAppointments = doctorIdSearch
        ? appointments.filter(app => app.doctorId.toString().includes(doctorIdSearch))
        : appointments;

    const sortedAppointments = [...filteredAppointments].sort((a, b) => a.id - b.id);

    return (
        <div>
            <div className="row">
                <h1 className="header-name">Appointments List</h1>
            </div>

            {/* Search Field */}
            <div className="form-group">
                <label htmlFor="doctorIdSearch">Search by Doctor ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="doctorIdSearch"
                    placeholder="Enter Doctor ID"
                    value={doctorIdSearch}
                    onChange={(e) => setDoctorIdSearch(e.target.value)}
                />
            </div>

            <button
                className="btn btn-primary"
                onClick={() => handleEditAppointment(null)} // Open form for adding a new appointment
            >
                Add New Appointment
            </button>

            <table className="table table-bordered appointment-tbl">
                <thead>
                <tr className="tbl-head">
                    <th>ID</th>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Doctor ID</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedAppointments.map(appointment => (
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{ appointment.patientId }</td>
                        <td>{ appointment.patientName }</td>
                        <td>{ appointment.doctorId }</td>
                        <td>{ appointment.doctorName }</td>
                        <td>{appointment.appointmentDate.split('T')[0]}</td> {/* Date */}
                        <td>{appointment.appointmentDate.split('T')[1]}</td> {/* Time */}
                        <td>
                            <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="img-fluid edit"
                                onClick={() => handleEditAppointment(appointment)}
                            />
                            <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="img-fluid delete"
                                onClick={() => confirmDelete(appointment.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Appointment Form Modal */}
            {showEditAppointmentModal && (
                <AppointmentForm
                    appointmentId={currentAppointment ? currentAppointment.id : null}
                    onClose={() => setShowEditAppointmentModal(false)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmationModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowDeleteConfirmationModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this appointment?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteConfirmationModal(false)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteAppointment}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentList;
