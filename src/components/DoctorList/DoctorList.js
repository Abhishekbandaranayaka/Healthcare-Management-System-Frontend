import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorList.css';
import {useNavigate} from "react-router-dom";

const DoctorList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
    const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [newDoctor, setNewDoctor] = useState({
        firstName: '',
        lastName: '',
        specialization: '',
        contactInformation: ''
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/doctor');
                if (Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching doctors:', err.response || err.message || err);
                setError('Error fetching doctors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleAddDoctor = () => {
        setShowAddDoctorModal(true);
        setCurrentDoctor(null); // Reset current doctor
        setNewDoctor({
            firstName: '',
            lastName: '',
            specialization: '',
            contactInformation: ''
        });
    };

    const handleEditDoctor = (doctor) => {
        setCurrentDoctor(doctor);
        setNewDoctor(doctor);
        setShowEditDoctorModal(true);
    };

    const handleSubmit = () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const handleConfirm = async () => {
        try {
            if (currentDoctor) {
                // Update existing doctor
                await axios.put(`http://localhost:8081/api/doctor/update/${currentDoctor.id}`, newDoctor);
                setDoctors(doctors.map(doc => doc.id === currentDoctor.id ? { ...doc, ...newDoctor } : doc));
            } else {
                // Add new doctor
                const response = await axios.post('http://localhost:8081/api/doctor/create', newDoctor);
                setDoctors([...doctors, response.data]);
            }
            setShowAddDoctorModal(false);
            setShowEditDoctorModal(false);
            setShowConfirmationModal(false); // Close the confirmation modal
            window.location.reload();
        } catch (error) {
            console.error('Error saving doctor:', error);
        }
    };

    const handleDeleteDoctor = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/doctor/delete/${doctorToDelete}`);
            setDoctors(doctors.filter(doc => doc.id !== doctorToDelete));
            setShowDeleteConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };
    const handleRegisterDoctor = () => {
        navigate('/signup-member'); // Redirect to the signup page
    };

    const confirmDelete = (id) => {
        setDoctorToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const sortedDoctors = [...doctors].sort((a, b) => a.id - b.id);

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <h1 className="header-name">Doctors List</h1>
                </div>
                <div className="col-3">
                    <button
                        className="adddoctor-btn btn btn-outline-primary"
                        onClick={handleAddDoctor}
                    >
                        Add Doctor
                    </button>
                </div>
                <div className="col-3">
                    <button
                        className="adddoctor-btn btn btn-outline-primary"
                        onClick={handleRegisterDoctor}
                    >
                        Doctor Registration
                    </button>
                </div>
            </div>
            <table className="table table-bordered doctor-tbl">
                <thead>
                <tr className="tbl-head">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialization</th>
                    <th>Contact Information</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedDoctors.map(doctor => (
                    <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.firstName}</td>
                        <td>{doctor.lastName}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.contactInformation}</td>
                        <td>
                            <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="img-fluid edit"
                                onClick={() => handleEditDoctor(doctor)}
                            />
                            <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="img-fluid delete"
                                onClick={() => confirmDelete(doctor.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Adding/Editing a Doctor */}
            {(showAddDoctorModal || showEditDoctorModal) && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentDoctor ? 'Edit Doctor' : 'Add Doctor'}</h5>
                                <button
                                    type="button"
                                    className="  close "
                                    onClick={() => { setShowAddDoctorModal(false); setShowEditDoctorModal(false); }}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={newDoctor.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={newDoctor.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Specialization</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="specialization"
                                        value={newDoctor.specialization}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Information</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contactInformation"
                                        value={newDoctor.contactInformation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setShowAddDoctorModal(false); setShowEditDoctorModal(false); }}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm {currentDoctor ? 'Update' : 'Addition'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to {currentDoctor ? 'update' : 'add'} this doctor?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirm}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <p>Are you sure you want to delete this doctor?</p>
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
                                    onClick={handleDeleteDoctor}
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

export default DoctorList;
