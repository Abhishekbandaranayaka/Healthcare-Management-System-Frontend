import React from 'react';
import './searchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const navigate = useNavigate();
    
    const results = [
        { name: 'Dr. Gotabhaya Ranasinghe', specialization: 'Cardiologist' },
        { name: 'Dr. Manawshard Ali', specialization: 'Cardiologist' },
        // Add more doctors as needed
    ];

    const handleCardClick = (doctorName) => {
        navigate(`/bookinginformation/${doctorName}`);
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
                            onClick={() => handleCardClick(result.name)}
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
