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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigation of the list of doctors, user searched
        navigate('/search results'); 
    };

    return (
        //Dummy doctorlist & specializations has added, before connect with database
        <div id="root">
              <NavBar />  
        <div className="appointment-booking-container">
            <h1>APPOINTMENT BOOKING</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                        <option value="">Doctor</option>
                        <option value="Dr. Smith">Dr. Smith</option>
                        <option value="Dr. Jane">Dr. Jane</option>
                        <option value="Dr. Smith">Dr. ANN</option>
                        <option value="Dr. Jane">Dr. Jack</option>
                        <option value="Dr. Jane">Dr. Velma</option>
                    </select>
                </div>
                <div className="form-group">
                    <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                        <option value="">Specialization</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Cardiologist">Neaurologist</option>
                        <option value="Dermatologist">Physician</option>
                        <option value="Cardiologist">VOG</option>
                        <option value="Dermatologist">Dentist</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button type="submit">SEARCH</button>
            </form>
        </div>
        <Footer />
        </div>
    );
};

export default AppointmentBooking;
