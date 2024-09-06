import React, { useState } from 'react';
import axios from 'axios';
import './CreateBill.css';

function CreateBill() {
    const [patientId, setPatientId] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('PENDING'); // Default to 'PENDING'
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // For showing success/error message

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const billData = {
            patientId: patientId,
            amount: parseFloat(amount),
            status: status,
        };

        try {
            const response = await axios.post('http://localhost:8085/api/billing/create', billData);
            setMessage('Bill created successfully!');
            setShowModal(true);
        } catch (error) {
            console.error('Error creating bill:', error);
            setMessage('Error creating bill. Please try again.');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="create-bill-container">
            <h2>Create Bill</h2>
            <form onSubmit={handleSubmit} className="create-bill-form">
                <label>
                    Patient ID:
                    <input type="text" value={patientId} onChange={handlePatientIdChange} required />
                </label>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={handleAmountChange} required />
                </label>
                <label>
                    Status:
                    <select value={status} onChange={handleStatusChange}>
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                    </select>
                </label>
                <a href="/admin/bill-list"></a><button type="submit">Create Bill</button>
            </form>
            <a href="/admin/bill-list" style={{ display: 'inline-block', width: '80px', textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Bill List
                </button>
            </a>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateBill;
