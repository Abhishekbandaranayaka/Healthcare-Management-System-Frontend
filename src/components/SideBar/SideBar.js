import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.css';

function SideBar({ sections }) {
    const [activeSection, setActiveSection] = useState('');

    const handleSectionClick = (section) => {
        setActiveSection(section === activeSection ? '' : section);
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
            <ul className="nav nav-pills flex-column mb-auto">

                {/* Doctor Section */}
                {sections.includes('doctor') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'doctor' ? 'active' : ''}`}
                            to="/admin/doctor-list" // Use the to prop for routing
                            onClick={() => handleSectionClick('doctor')}
                        >
                            Doctor
                        </Link>
                    </li>
                )}

                {/* Patient Section */}
                {sections.includes('patient-admin') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'patient' ? 'active' : ''}`}
                            to="/admin/patient-list" // Updated to reflect the correct route
                            role="button"
                            onClick={() => handleSectionClick('patient')}
                        >
                            Patient
                        </Link>
                    </li>
                )}
                {sections.includes('patient') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'patient' ? 'active' : ''}`}
                            to="/doctor/patient-list" // Updated to reflect the correct route
                            role="button"
                            onClick={() => handleSectionClick('patient')}
                        >
                            Patient
                        </Link>
                    </li>
                )}

                {/* Appointment Section */}
                {sections.includes('appointment-admin') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'appointment' ? 'active' : ''}`}
                            to="/admin/appointment-list"
                            role="button"
                            onClick={() => handleSectionClick('appointment')}
                        >
                            Appointment
                        </Link>
                    </li>
                )}
                {sections.includes('appointment-operator') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'appointment' ? 'active' : ''}`}
                            to="/operator/appointment-list"
                            role="button"
                            onClick={() => handleSectionClick('appointment')}
                        >
                            Appointment
                        </Link>
                    </li>
                )}

                {/* Bill Section */}
                {sections.includes('bill') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'bill' ? 'active' : ''}`}
                            to="#"
                            role="button"
                            onClick={() => handleSectionClick('bill')}
                        >
                            Bill
                        </Link>
                        <div className={`collapse ${activeSection === 'bill' ? 'show' : ''}`} id="billSubMenu">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/open-bill" className="nav-link">Open Bill</Link></li>
                                <li><Link to="/not-paid-bill" className="nav-link">Not Paid Bill</Link></li>
                                <li><Link to="/all-bills" className="nav-link">All Bills</Link></li>
                            </ul>
                        </div>
                    </li>
                )}

                {/* Medical Records Section */}
                {sections.includes('medicalRecords') && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === 'medicalRecords' ? 'active' : ''}`}
                            to="/admin/medical-records"
                            role="button"
                            onClick={() => handleSectionClick('medicalRecords')}
                        >
                            Medical Records
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default SideBar;