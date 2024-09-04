import React from 'react';
import { Card, Button, Row, Col, Container, Image } from 'react-bootstrap';

import './BookingInformation.css';

const DoctorProfileWithBookings = () => {
  const bookings = [
    { date: '2024 July 21', time: '8:30 AM', isFull: false },
    { date: '2024 July 21', time: '3:00 PM', isFull: true },
    { date: '2024 July 22', time: '3:00 PM', isFull: false },
    { date: '2024 July 23', time: '8:30 AM', isFull: false },
    { date: '2024 July 27', time: '3:00 PM', isFull: false },
    { date: '2024 July 31', time: '6:00 PM', isFull: true },
    { date: '2024 July 31', time: '6:00 PM', isFull: true },
  ];

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
                    <i className="bi bi-person-circle"></i>
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
            {bookings.map((booking, index) => (
              <Col md={6} key={index}>
                <Card className="booking-info-card mb-4 ">
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
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfileWithBookings;
