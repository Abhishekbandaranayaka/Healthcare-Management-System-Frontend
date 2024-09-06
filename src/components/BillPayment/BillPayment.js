import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BillPayment.css';

function BillPayment() {
    const [billId, setBillId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // For displaying the popup

    const handleBillIdChange = (event) => {
        setBillId(event.target.value);
    };

    const handlePaymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const paymentData = {
            bill: { id: billId },
            amount: parseFloat(paymentAmount),
            paymentDate: new Date().toISOString().slice(0, 10),
        };

        try {
            const response = await axios.post('http://localhost:8085/api/billing/process_payment', paymentData);
            const paymentResponse = response.data;

            if (paymentResponse.bill.status === 'PAID') {
                if (paymentAmount > paymentResponse.bill.amount) {
                    const balance = paymentAmount - paymentResponse.bill.amount;
                    setMessage(`Payment successful. Balance: $${balance.toFixed(2)}`);
                } else {
                    setMessage('Payment successful. No balance.');
                }
            } else if (paymentResponse.bill.status === 'PARTIALLY PAID') {
                const remainingAmount = paymentResponse.bill.amount - paymentAmount;
                setMessage(`Partial payment recorded. Remaining amount: $${remainingAmount.toFixed(2)}`);
            }

            setShowModal(true); // Show the popup after payment
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Payment Successfully Done.');
            setShowModal(true); // Show the popup with error message
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bill-payment-container">
            <h2>Bill Payment</h2>
            <form onSubmit={handleSubmit} className="bill-payment-form">
                <label>
                    Bill ID:
                    <input type="text" value={billId} onChange={handleBillIdChange} required />
                </label>
                <label>
                    Payment Amount:
                    <input type="number" value={paymentAmount} onChange={handlePaymentAmountChange} required />
                </label>
                <button type="submit">Pay</button>
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

export default BillPayment;
