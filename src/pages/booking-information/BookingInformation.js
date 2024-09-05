import React, { useState } from 'react';
import { Card, Button, Row, Col, Container, Image, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './BookingInformation.css';

const DoctorProfileWithBookings = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');  // For displaying booking errors
  const [bookings, setBookings] = useState([
    { id: 1, date: '2024-09-21', time: '08:30', isFull: false },
    { id: 2, date: '2024-09-21', time: '15:00', isFull: true },
    { id: 3, date: '2024-09-22', time: '15:00', isFull: false },
    { id: 4, date: '2024-09-23', time: '08:30', isFull: false },
    { id: 5, date: '2024-09-27', time: '15:00', isFull: false },
    { id: 6, date: '2024-09-31', time: '18:00', isFull: true },
  ]);

  const patientId = 10; // Replace with actual patient ID from authentication context
  const doctorId = 3; // Assuming doctorId is known from previous page
  const navigate = useNavigate(); // Initialize useNavigate hook

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(`${dateStr} ${timeStr}`);
    return date.toISOString();
  };

  const handleBookNowClick = async (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;  // If booking not found, do nothing

    setError('');  // Reset error state before new booking attempt

    if (!patientId) {
      setShowModal(true);
      return;
    }

    const appointmentData = {
      patientId: patientId,
      doctorId: doctorId,
      appointmentDate: formatDateTime(booking.date, booking.time),
      status: 'scheduled',
    };

    try {
      const response = await axios.post('http://localhost:8082/api/appointments/create', appointmentData);
      alert('Appointment successfully booked!');

      // Update the booking state to mark the slot as full
      setBookings(prevBookings =>
          prevBookings.map(b =>
              b.id === bookingId ? { ...b, isFull: true } : b
          )
      );

      // Navigate to PatientDetails page after successful booking
      navigate('/details');  // Adjust the path as per your routing
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error booking appointment!';
      setError(errorMsg);  // Set error message for better feedback
      alert('Error booking appointment: ' + errorMsg);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
      <Container fluid className="p-0">
        <Row noGutters className="mb-4">
          <Col>
            <div className="layer1">
              <Image src={`${process.env.PUBLIC_URL}/assets/booking.jpg`} fluid className="w-100" />
            </div>
            <Col md={6} className="doctor-info-col">
              <Card className="doctor-profile-card d-flex align-items-center">
                <Row noGutters className="w-100">
                  <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <div className="doctor-icon">
                      <Image src={`${process.env.PUBLIC_URL}/assets/doctor.png`} className='image2' />
                    </div>
                  </Col>
                  <Col xs={8} className="p-4">
                    <Card.Body>
                      <Card.Title className="doctor-name">DR GOTABHAYA RANASINGHE</Card.Title>
                      <Card.Text className="doctor-specialty">Cardiologist</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Col>
        </Row>

        <Row className='secondrow'>
          <Col md={5}>
            <Card className="secondrowcard p-3">
              <Card.Body>
                <Card.Text>
                  <strong>Professional Qualifications & Memberships:</strong><br /> N/A <br /><br />
                  <strong>Areas of Specializations:</strong> <br />Cardiologist, Cardiothoracic Surgeon <br /><br />
                  <strong>Languages:</strong> <br />N/A <br /><br />
                  <strong>Availability:</strong><br /> Available Today <br /><br />
                  <strong>Contact:</strong> <br />N/A <br /><br />
                  <strong>Email:</strong><br /> gotabhayaransinghe@gmail.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <div className="booking-info">
              <h5 className="booking-title">BOOKING INFORMATION</h5>
            </div>
            <Row>
              {bookings.map((booking) => (
                  <Col md={6} key={booking.id}>
                    <Card className="booking-info-card mb-4">
                      <Card.Body>
                        <Row className="d-flex align-items-center justify-content-between">
                          <Col xs={3}>
                            <Image src={`${process.env.PUBLIC_URL}/assets/doctor.png`} rounded className="booking-image w-100" />
                          </Col>
                          <Col xs={4}>
                            <Card.Text className="booking-date-time">
                              <strong>{booking.date}</strong><br /> {booking.time}
                            </Card.Text>
                          </Col>
                          <Col xs={4}>
                            <Button
                                className={`btn-sm text-center w-100 ${booking.isFull ? "full-button" : "book-now-button"}`}
                                onClick={() => handleBookNowClick(booking.id)}
                            >
                              {booking.isFull ? "Full" : "Book Now"}
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
              ))}
            </Row>
            {error && <div className="text-danger">{error}</div>}  {/* Display error message */}
          </Col>
        </Row>

        {/* Modal for not logged-in users */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body className="text-center">
            <h4 className="text-danger">Error!</h4>
            <p>Please log in or sign up to make an appointment</p>
            <Button variant="secondary" onClick={handleCloseModal} className="custom-cancel-button">
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
  );
};

export default DoctorProfileWithBookings;
