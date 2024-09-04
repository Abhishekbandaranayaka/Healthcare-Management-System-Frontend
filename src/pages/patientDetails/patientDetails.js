import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './patientDetails.css';

function Details() {
  const [patientData, setPatientData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  const [channelDetails, setChannelDetails] = useState({
    doctorName: '',
    specialization: '',
    appointmentDate: '',
    time: '',
    patientId: '',
    doctorNotes: ''
  });

  // Fetch channel details (appointment data) when the component mounts
  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        // Assuming there's a single appointment you want to fetch by its ID
        const response = await axios.get('http://localhost:8082/api/appointments/1'); // Adjust endpoint and ID accordingly
        const appointment = response.data;

        // Map the fetched appointment data to your state
        setChannelDetails({
          doctorName: appointment.doctorName, // Assuming this field exists in your appointment model
          specialization: appointment.specialization, // If it's available
          appointmentDate: appointment.appointmentDate,
          // time: appointment.appointmentDate.split('T')[1], // Assuming time is part of the appointmentDate
          patientId: appointment.patientId,
          doctorNotes: appointment.doctorNotes // Assuming this field exists
        });
      } catch (error) {
        console.error('There was an error fetching the channel details!', error);
      }
    };

    fetchChannelDetails();
  }, []);

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/patients/create', patientData);
      alert('Patient details submitted successfully: ' + response.data);
      // Reset form after submission
      setPatientData({
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
      });
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Failed to submit patient details. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row details-row">
        {/* Channel Details Section */}
        <div className="col-md-5">
          <Card className="channel-details-card p-3 mb-4">
            <center><h4 className="channeldetail mb-3">CHANNEL DETAILS</h4></center>
            <p><strong>DOCTOR NAME</strong><br /><span className="left-padding">{channelDetails.doctorName}</span></p><hr />
            <p><strong>SPECIALIZATION</strong><br /><span className="left-padding">{channelDetails.specialization}</span></p><hr />
            <p><strong>DATE</strong><br /><span className="left-padding">{channelDetails.appointmentDate.split('T')[0]}</span></p><hr />
            <p><strong>TIME</strong><br /><span className="left-padding">{channelDetails.time}</span></p><hr />
            <p><strong>PATIENT NUMBER</strong><br /><span className="left-padding">{channelDetails.patientId}</span></p><hr />
            <p><strong>DOCTOR NOTES</strong><br /><p className="left-padding ">{channelDetails.doctorNotes}</p></p>
          </Card>
        </div>

        {/* Patient Details Section */}
        <div className="col-md-7">
          <Form className="patient-details-card p-4 mb-4" onSubmit={handleSubmit}>
            <h4 className="patient-details mb-3">PATIENT DETAILS</h4>
            <Form.Group controlId="formPatientName">
              <Form.Label className="lable">Patient Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={patientData.name}
                  onChange={handleChange}
                  className="controll"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="lable">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={patientData.address}
                onChange={handleChange}
                className="controll"
                required
              />
            </Form.Group>

            <Form.Group controlId="formContactNumber">
              <Form.Label className="lable">Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="phoneNumber"
                value={patientData.phoneNumber}
                onChange={handleChange}
                className="controll"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="lable">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@gmail.com"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                className="controll"
              />
            </Form.Group>

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

// import React, { useState } from 'react';
// import { Card, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import './patientDetails.css';

// function Details() {
//   const [patientData, setPatientData] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     email: ''
//   });

//   const handleChange = (e) => {
//     setPatientData({
//       ...patientData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/api/patients/create', patientData);
//       alert('Patient details submitted successfully: ' + response.data);
//       // Reset form after submission
//       setPatientData({
//         name: '',
//         address: '',
//         phoneNumber: '',
//         email: ''
//       });
//     } catch (error) {
//       console.error('There was an error submitting the form!', error);
//       alert('Failed to submit patient details. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row details-row">
//         {/* Channel Details Section */}
//         <div className="col-md-5">
//           <Card className="channel-details-card p-3 mb-4">
//             <center><h4 className="channeldetail mb-3">CHANNEL DETAILS</h4></center>
//             <p><strong>DOCTOR NAME</strong><br /><span className="left-padding">DR. GOTABHAYA RANASINGHE</span></p><hr />
//             <p><strong>SPECIALIZATION</strong><br /><span className="left-padding">CARDIOLOGIST</span></p><hr />
//             <p><strong>DATE</strong><br /><span className="left-padding">2024 Aug 21</span></p><hr />
//             <p><strong>TIME</strong><br /><span className="left-padding">8.30 AM</span></p><hr />
//             <p><strong>PATIENT NUMBER</strong><br /><span className="left-padding">10</span></p><hr />
//             <p><strong>DOCTOR NOTES</strong><br /><p className="left-padding ">ALL PATIENTS SHOULD WEAR A MASK AND MUST HAVE COMPLETED A PCR TEST.</p></p>
//           </Card>
//         </div>

//         {/* Patient Details Section */}
//         <div className="col-md-7">
//           <Form className="patient-details-card p-4 mb-4" onSubmit={handleSubmit}>
//             <h4 className="patient-details mb-3">PATIENT DETAILS</h4>
//             <Form.Group controlId="formPatientName">
//               <Form.Label className="lable">Patient Name</Form.Label>
//               <div className="d-flex">
//                 <Form.Control
//                   type="text"
//                   placeholder="Name"
//                   name="name"
//                   value={patientData.name}
//                   onChange={handleChange}
//                   className="controll"
//                   required
//                 />
//               </div>
//             </Form.Group>

//             <Form.Group controlId="formAddress">
//               <Form.Label className="lable">Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Address"
//                 name="address"
//                 value={patientData.address}
//                 onChange={handleChange}
//                 className="controll"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formContactNumber">
//               <Form.Label className="lable">Contact Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Mobile Number"
//                 name="phoneNumber"
//                 value={patientData.phoneNumber}
//                 onChange={handleChange}
//                 className="controll"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label className="lable">Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="email@gmail.com"
//                 name="email"
//                 value={patientData.email}
//                 onChange={handleChange}
//                 className="controll"
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="button mt-3">
//               SUBMIT
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Details;