import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentDetailsPopup.css'; // Ensure this CSS file has your custom styles

function PaymentDetailsPopup({ show, onClose }) {
    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Payment Details</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Appointment ID</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="1" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="Ima Herath" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Doctor Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="Dr. Umara Singhewansha" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Time</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="10:00 AM" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Date</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="10/06/2024" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Appointment Fee</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="Rs. 3500" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Cash</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="Rs. 5000" readOnly />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-4 col-form-label">Balance</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" value="Rs. 1500" readOnly />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentDetailsPopup;