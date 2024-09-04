import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MedicalRecordList.css'; // Ensure this CSS file exists

const MedicalRecordList = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditRecordModal, setShowEditRecordModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [newRecord, setNewRecord] = useState({
        patientId: '',
        medicalHistory: '',
        diagnosis: '',
        treatments: ''
    });

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8084/api/medical_records');
                if (Array.isArray(response.data)) {
                    setRecords(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching records:', err.response || err.message || err);
                setError('Error fetching records. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleEditRecord = (record) => {
        setCurrentRecord(record);
        setNewRecord(record);
        setShowEditRecordModal(true);
    };

    const handleSubmit = () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const handleConfirm = async () => {
        try {
            if (currentRecord) {
                // Update existing record
                await axios.put(`http://localhost:8084/api/medical-records/update/${currentRecord.recordId}`, newRecord);
                setRecords(records.map(rec => rec.recordId === currentRecord.recordId ? { ...rec, ...newRecord } : rec));
            } else {
                // Add new record
                const response = await axios.post('http://localhost:8084/api/medical-records/create', newRecord);
                setRecords([...records, response.data]);
            }
            setShowEditRecordModal(false);
            setShowConfirmationModal(false); // Close the confirmation modal
        } catch (error) {
            console.error('Error saving record:', error);
        }
    };

    const handleDeleteRecord = async () => {
        try {
            await axios.delete(`http://localhost:8084/api/medical-records/delete/${recordToDelete}`);
            setRecords(records.filter(rec => rec.recordId !== recordToDelete));
            setShowDeleteConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const confirmDelete = (id) => {
        setRecordToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const sortedRecords = [...records].sort((a, b) => a.recordId.localeCompare(b.recordId));

    return (
        <div>
            <div className="row">
                <h1 className="header-name">Medical Records List</h1>
            </div>
            <table className="table table-bordered medical-record-tbl">
                <thead>
                <tr className="tbl-head">
                    <th>Patient ID</th>
                    <th>Medical History</th>
                    <th>Diagnosis</th>
                    <th>Treatments</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedRecords.map(record => (
                    <tr key={record.recordId}>
                        <td>{record.patientId}</td>
                        <td>{record.medicalHistory}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.treatments}</td>
                        <td>
                            <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="img-fluid edit"
                                onClick={() => handleEditRecord(record)}
                            />
                            <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="img-fluid delete"
                                onClick={() => confirmDelete(record.recordId)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Adding/Editing a Record */}
            {showEditRecordModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentRecord ? 'Edit Record' : 'Add Record'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => { setShowEditRecordModal(false); }}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Patient ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="patientId"
                                        value={newRecord.patientId}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Medical History</label>
                                    <textarea
                                        className="form-control"
                                        name="medicalHistory"
                                        value={newRecord.medicalHistory}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Diagnosis</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="diagnosis"
                                        value={newRecord.diagnosis}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Treatments</label>
                                    <textarea
                                        className="form-control"
                                        name="treatments"
                                        value={newRecord.treatments}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setShowEditRecordModal(false); }}
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
                                <h5 className="modal-title">Confirm {currentRecord ? 'Update' : 'Addition'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to {currentRecord ? 'update' : 'add'} this record?</p>
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
                                <p>Are you sure you want to delete this record?</p>
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
                                    onClick={handleDeleteRecord}
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

export default MedicalRecordList;
