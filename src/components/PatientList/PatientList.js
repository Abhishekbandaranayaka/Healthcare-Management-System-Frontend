import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditPatientModal, setShowEditPatientModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [newPatient, setNewPatient] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patients');
                if (Array.isArray(response.data)) {
                    setPatients(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching patients:', err.response || err.message || err);
                setError('Error fetching patients. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };


    const handleEditPatient = (patient) => {
        setCurrentPatient(patient);
        setNewPatient(patient);
        setShowEditPatientModal(true);
    };

    const handleSubmit = () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const handleConfirm = async () => {
        try {
            if (currentPatient) {
                // Update existing patient
                await axios.put(`http://localhost:8080/api/patients/update/${currentPatient.id}`, newPatient);
                setPatients(patients.map(pat => pat.id === currentPatient.id ? { ...pat, ...newPatient } : pat));
            } else {
                // Add new patient
                const response = await axios.post('http://localhost:8080/api/patients/create', newPatient);
                setPatients([...patients, response.data]);
            }
            setShowEditPatientModal(false);
            setShowConfirmationModal(false); // Close the confirmation modal
            window.location.reload();
        } catch (error) {
            console.error('Error saving patient:', error);
        }
    };

    const handleDeletePatient = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/patients/delete/${patientToDelete}`);
            setPatients(patients.filter(pat => pat.id !== patientToDelete));
            setShowDeleteConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const confirmDelete = (id) => {
        setPatientToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const sortedPatients = [...patients].sort((a, b) => a.id - b.id);

    return (
        <div>
            <div className="row">
                <h1 className="header-name">Patients List</h1>
            </div>
            <table className="table table-bordered patient-tbl">
                <thead>
                <tr className="tbl-head">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedPatients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.address}</td>
                        <td>{patient.phoneNumber}</td>
                        <td>{patient.email}</td>
                        <td>
                            <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="img-fluid edit"
                                onClick={() => handleEditPatient(patient)}
                            />
                            <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="img-fluid delete"
                                onClick={() => confirmDelete(patient.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Adding/Editing a Patient */}
            {(showEditPatientModal) && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentPatient ? 'Edit Patient' : 'Add Patient'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => { setShowEditPatientModal(false); }}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={newPatient.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={newPatient.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={newPatient.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={newPatient.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setShowEditPatientModal(false); }}
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
                                <h5 className="modal-title">Confirm {currentPatient ? 'Update' : 'Addition'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to {currentPatient ? 'update' : 'add'} this patient?</p>
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
                                <p>Are you sure you want to delete this patient?</p>
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
                                    onClick={handleDeletePatient}
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

export default PatientList;
