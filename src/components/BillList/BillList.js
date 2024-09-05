import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BillList.css';

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditBillModal, setShowEditBillModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [billToDelete, setBillToDelete] = useState(null);
    const [currentBill, setCurrentBill] = useState(null);
    const [newBill, setNewBill] = useState({
        patientId: '',
        amount: '',
        status: '',
        payments: []
    });

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/billing/bills'); // Adjusted URL
                if (Array.isArray(response.data)) {
                    setBills(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching bills:', err.response || err.message || err);
                setError('Error fetching bills. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewBill({...newBill, [name]: value});
    };

    const handleEditBill = (bill) => {
        setCurrentBill(bill);
        setNewBill({
            patientId: bill.patientId,
            amount: bill.amount,
            status: bill.status,
            payments: bill.payments || []
        });
        setShowEditBillModal(true);
    };

    const handleSubmit = () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const handleConfirm = async () => {
        try {
            if (currentBill) {
                // Update existing bill
                await axios.put(`http://localhost:8084/api/billing/${currentBill.id}`, newBill);
                setBills(bills.map(bill => bill.id === currentBill.id ? {...bill, ...newBill} : bill));
            } else {
                // Add new bill
                const response = await axios.post('http://localhost:8084/api/billing/create', newBill);
                setBills([...bills, response.data]);
            }
            setShowEditBillModal(false);
            setShowConfirmationModal(false); // Close the confirmation modal
            window.location.reload();
        } catch (error) {
            console.error('Error saving bill:', error);
        }
    };

    const handleDeleteBill = async () => {
        try {
            await axios.delete(`http://localhost:8084/api/billing/${billToDelete}`);
            setBills(bills.filter(bill => bill.id !== billToDelete));
            setShowDeleteConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    const confirmDelete = (id) => {
        setBillToDelete(id);
        setShowDeleteConfirmationModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const sortedBills = [...bills].sort((a, b) => a.id - b.id);

    return (
        <div className="container">
            <div className="row">
                <h1 className="header-name">Bills List</h1>
            </div>
            <table className="table table-bordered bill-tbl">
                <thead>
                <tr className="tbl-head">
                    <th>ID</th>
                    <th>Patient ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payments</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedBills.map(bill => (
                    <tr key={bill.id}>
                        <td>{bill.id}</td>
                        <td>{bill.patientId}</td>
                        <td>{bill.amount}</td>
                        <td>{bill.status}</td>
                        <td>
                            {bill.payments && bill.payments.length > 0 ? (
                                <ul>
                                    {bill.payments.map(payment => (
                                        <li key={payment.paymentId}>Amount: {payment.amount}</li>
                                    ))}
                                </ul>
                            ) : 'No Payments'}
                        </td>
                        <td>
                            <img
                                src="/assets/edit.png"
                                alt="edit"
                                className="img-fluid edit"
                                onClick={() => handleEditBill(bill)}
                            />
                            <img
                                src="/assets/delete.png"
                                alt="delete"
                                className="img-fluid delete"
                                onClick={() => confirmDelete(bill.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Modal for Adding/Editing a Bill */}
            {(showEditBillModal) && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentBill ? 'Edit Bill' : 'Add Bill'}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowEditBillModal(false);
                                    }}
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
                                        value={newBill.patientId}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="amount"
                                        value={newBill.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="status"
                                        value={newBill.status}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowEditBillModal(false);
                                    }}
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
        </div>
    );
};

export default BillList;
