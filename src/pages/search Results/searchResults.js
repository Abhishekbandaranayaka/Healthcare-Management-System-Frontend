import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch appointment data from the backend
        axios.get('http://localhost:8082/api/appointments') // Update URL as needed
            .then(response => {
                const appointmentResults = response.data.map(appointment => ({
                    name: `Dr. ${appointment.doctorName}`,
                    specialization: appointment.specialization
                }));
                setResults(appointmentResults);
            })
            .catch(error => {
                console.error('Error fetching the appointment data!', error);
            });
    }, []);

    const handleCardClick = (doctorName, specialization) => {
        navigate('/bookinginformation', { state: { doctorName, specialization } });
    };

    return (
        <div id="root">
            <NavBar />
            <div className="search-results-container">
                <div className="filter-section">
                    <h1>APPOINTMENT BOOKING</h1>
                    <div className="form-group">
                        <label>Doctor</label>
                        <select>
                            <option value="">Select Doctor</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Dr. Jane">Dr. Jane</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Specialization</label>
                        <select>
                            <option value="">Select Specialization</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" />
                    </div>
                    <button type="button">SEARCH</button>
                </div>
                <div className="results-section">
                    {results.map((result, index) => (
                        <button
                            key={index}
                            className="result-card"
                            onClick={() => handleCardClick(result.name, result.specialization)}
                        >
                            <div className="result-card-content">
                                <span>{result.name}</span>
                                <span>{result.specialization}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
