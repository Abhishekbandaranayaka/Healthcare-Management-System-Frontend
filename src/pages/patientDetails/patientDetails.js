import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './patientDetails.css'; 

function Details() {
  return (
    <div className="container mt-5 ">
      <div className="row details-row">
        {/* Channel Details Section */}
        <div className="col-md-5">
          <Card className="channel-details-card p-3 mb-4">
            <center><h4 className="channeldetail mb-3">CHANNEL DETAILS</h4></center>
            <p><strong>DOCTOR NAME</strong><br/><span className="left-padding">DR. GOTABHAYA RANASINGHE</span></p><hr/>
            <p><strong>SPECIALIZATION</strong><br/><span className="left-padding">CARDIOLOGIST</span></p><hr/>
            <p><strong>DATE</strong><br/><span className="left-padding">2024 Aug 21</span></p><hr/>
            <p><strong>TIME</strong><br/><span className="left-padding">8.30 AM</span></p><hr/>
            <p><strong>PATIENT NUMBER</strong><br/><span className="left-padding">10</span></p><hr/>
            <p><strong>DOCTOR NOTES</strong><br/><p className="left-padding ">ALL PATIENTS SHOULD WEAR A MASK AND MUST HAVE COMPLETED A PCR TEST.</p></p>
          </Card>
        </div>

        {/* Patient Details Section */}
        <div className="col-md-7">
          <Form className="patient-details-card p-4  mb-4">
            <h4 className="patient-details mb-3">PATIENT DETAILS</h4>
            <Form.Group controlId="formPatientName">
              <Form.Label className="lable">Patient Name</Form.Label>
              <div className="d-flex">
                <Form.Control type="text" placeholder="MR." className="controll1 mr-2" />
                <Form.Control type="text" placeholder="Name" className="controll"/>
              </div>
            </Form.Group>

            <Form.Group controlId="formNIC">
              <Form.Label className="lable">National Identity Card Number (NIC)</Form.Label>
              <Form.Control type="text" placeholder="NIC" className="controll"/>
            </Form.Group>

            <Form.Group controlId="formContactNumber">
              <Form.Label className="lable">Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Mobile Number" className="controll" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="lable">Email</Form.Label>
              <Form.Control type="email" placeholder="email@gmail.com" className="controll"/>
            </Form.Group>
            <br/><br/>
            <Button variant="primary" type="submit" className="button mt-3">
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Details;
