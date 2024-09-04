import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MedicalRecordList.css';

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
    const [searchQuery, setSearchQuery] = useState('');

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
        setShowConfirmationModal(true);
    };

    const handleConfirm = async () => {
        try {
            if (currentRecord) {
                await axios.put(`http://localhost:8084/api/medical_records/update/${currentRecord.recordId}`, newRecord);
                setRecords(records.map(rec => rec.recordId === currentRecord.recordId ? { ...rec, ...newRecord } : rec));
            } else {
                const response = await axios.post('http://localhost:8084/api/medical_records/create', newRecord);
                setRecords([...records, response.data]);
            }
            setShowEditRecordModal(false);
            setShowConfirmationModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error saving record:', error);
        }
    };

    const confirmDelete = (id) => {
        setRecordToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Filter records based on search query
    const filteredRecords = records.filter(record =>
        record.patientId.toString().includes(searchQuery)
    );

    return (
        <div className="container">
            <div className="row mb-3">
                <h1 className="header-n">Medical Records List</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Patient ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                {filteredRecords.map(record => (
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
                                    onClick={() => setShowEditRecordModal(false)}
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
                                    onClick={() => setShowEditRecordModal(false)}
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
        </div>
    );
};

export default MedicalRecordList;
