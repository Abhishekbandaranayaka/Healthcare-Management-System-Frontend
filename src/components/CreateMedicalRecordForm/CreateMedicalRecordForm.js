import React, { useState } from 'react';
import axios from 'axios';
import './CreateMedicalRecordForm.css';

const CreateMedicalRecordForm = () => {
    const [patientId, setPatientId] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatments, setTreatments] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const medicalRecord = {
            patientId,
            medicalHistory,
            diagnosis,
            treatments
        };

        try {
            const response = await axios.post('http://localhost:8084/api/medical_records/create', medicalRecord);
            setMessage(response.data);
            setIsError(false);
        } catch (error) {
            setMessage('Error creating medical record');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Medical Record</h2>
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
                    <label>Medical History:</label>
                    <textarea
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Diagnosis:</label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Treatments:</label>
                    <input
                        type="text"
                        value={treatments}
                        onChange={(e) => setTreatments(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && (
                <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>
            )}
            <br/>
            <a href="/admin/medical-records" style={{ display: 'inline-block', width: '150px', textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Medical Records
                </button>
            </a>
        </div>
    );
};

export default CreateMedicalRecordForm;
