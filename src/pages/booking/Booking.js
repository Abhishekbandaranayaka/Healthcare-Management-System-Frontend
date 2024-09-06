import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const AppointmentBooking = () => {
    const [doctor, setDoctor] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Construct the query string
            const queryString = `specialization=${encodeURIComponent(specialization)}`;
            const response = await fetch(`http://localhost:8081/api/doctor/findBySpecialization?${queryString}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const doctors = await response.json();
            // Navigate to search results page with doctor data
            navigate('/search-results', { state: { doctors } });
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div id="root">
            <NavBar />
            <div className="appointment-booking-container">
                <h1>APPOINTMENT BOOKING</h1>
                <div className="searching">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                            <option value="">Doctor</option>
                            {/* Options should be fetched dynamically */}
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Dr. Jane">Dr. Jane</option>
                            <option value="Dr. Ann">Dr. Ann</option>
                            <option value="Dr. Jack">Dr. Jack</option>
                            <option value="Dr. Velma">Dr. Velma</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                            <option value="">Specialization</option>
                            {/* Options should be fetched dynamically */}
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Physician">Physician</option>
                            <option value="VOG">VOG</option>
                            <option value="Dentist">Dentist</option>
                        </select>
                    </div>
                    <button type="submit">SEARCH</button>
                </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AppointmentBooking;
