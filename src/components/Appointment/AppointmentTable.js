import React, { useState } from 'react';
import './AppointmentTable.css';

const initialAppointments = [
    { id: 1, name: 'Ima Herath', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Unpaid' },
    { id: 2, name: 'Udeshi Wijesekara', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Ajintha Disanayaka', status: 'Unpaid' },
    { id: 3, name: 'Abhishek Rathnayake', date: '13/06/2024', time: '10.30AM', doctor: 'Dr. Senaka Haputhanthree', status: 'Paid' },
    { id: 4, name: 'Sadula Fernando', date: '13/06/2024', time: '10.30AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Paid' },
    { id: 5, name: 'Kavidu Dharmasena', date: '13/06/2024', time: '11.00AM', doctor: 'Dr. Umariya Singhawansha', status: 'Unpaid' },
    { id: 6, name: 'Mevan Abesinghe', date: '13/06/2024', time: '10.30AM', doctor: 'Dr. Ajintha Disanayaka', status: 'Unpaid' },
    { id: 7, name: 'Ima Herath', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Paid' },
    { id: 8, name: 'Ima Herath', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Unpaid' },
    { id: 9, name: 'Ima Herath', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Unpaid' },
    { id: 10, name: 'Ima Herath', date: '13/06/2024', time: '10.00AM', doctor: 'Dr. Gotabhaya Ranasinghe', status: 'Paid' },
 
];

const AppointmentTable = ({ onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredAppointments = initialAppointments.filter((appointment) =>
      appointment.id.toString().includes(term) || 
      appointment.name.toLowerCase().includes(term) || 
      appointment.date.includes(term) || 
      appointment.time.includes(term) || 
      appointment.doctor.toLowerCase().includes(term) || 
      appointment.status.toLowerCase().includes(term)
    );
    setAppointments(filteredAppointments);
  };

  const handleRowClick = (appointment) => {
    if (onRowClick) {
      onRowClick(appointment);
    }
  };

  return (
    <div className="appointment-container">
      <h2>APPOINTMENT</h2>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor Name</th>
            <th>Paid / Unpaid</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} onClick={() => handleRowClick(appointment)}>
              <td>{appointment.id}</td>
              <td>{appointment.name}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.doctor}</td>
              <td className={appointment.status.toLowerCase()}>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;

