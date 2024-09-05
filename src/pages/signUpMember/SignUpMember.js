import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import backgroundImage from '../../assets/images/BG.jpg'; // Update the path if needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpMember() {
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '360px',
        },
        formContainer: {
            width: '90%',
            maxWidth: '480px',
            padding: '30px',
            borderRadius: '50px',
            backgroundColor: '#D9D9D9',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Calibri, sans-serif',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Times New Roman, serif',
            fontWeight: 'bold',
        },
        button: {
            width: '135px',
            height: '46px',
            borderRadius: '23px',
            background: `linear-gradient(
        to bottom, 
        rgba(126, 169, 186, 1) 0%, 
        rgba(126, 169, 186, 0.5) 50%, 
        rgba(126, 169, 186, 1) 100%
      )`,
            border: '1px solid #9AB4C6',
            color: 'rgba(0, 0, 0, 0.8)',
            fontWeight: 'bold',
            fontSize: '19px',
            textAlign: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            fontFamily: 'Calibri, sans-serif',
            position: 'relative',
            overflow: 'hidden',
        },
        buttonHover: {
            background: 'linear-gradient(to bottom, #7EA9BA 0%, #7EA9BA 50%, #7EA9BA 100%)',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3)',
            transform: 'scale(1.05)',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonSpacing: {
            margin: '0 40px',
        },
        textField: {
            backgroundColor: '#D9D9D9',
            border: '2px solid rgba(179, 171, 171, 0.72)',
            borderRadius: '8px',
            padding: '10px',
            fontFamily: 'Calibri, sans-serif',
        },
        bottomSpacing: {
            marginBottom: '30px',
        },
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/admin/doctor/register?role=DOCTOR', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                login: formData.login,
                password: formData.password,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
                },
            });
            alert('Doctor registered successfully');
            navigate('/admin/doctor-list'); // Redirect to another page if needed
        } catch (error) {
            console.error('There was an error registering the doctor!', error);
            alert('Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h3 style={styles.header}>Sign Up</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            style={styles.textField}
                            className="text-field"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            style={styles.textField}
                            className="text-field"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="login"
                            type="text"
                            placeholder="Enter your username"
                            style={styles.textField}
                            className="text-field"
                            value={formData.login}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            style={styles.textField}
                            className="text-field"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            style={styles.textField}
                            className="text-field"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div style={styles.bottomSpacing}></div>

                    <div style={styles.buttonGroup}>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ ...styles.button, ...styles.buttonSpacing }}
                            className="button-hover"
                        >
                            Ok
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            style={{ ...styles.button, ...styles.buttonSpacing }}
                            className="button-hover"
                            onClick={() => navigate('/')} // Redirect to home or any other page
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>

            <style jsx>{`
        .text-field::placeholder {
          color: rgba(0, 0, 0, 0.5);
        }

        .button-hover:hover {
          background: linear-gradient(to bottom, #7EA9BA 0%, #7EA9BA 50%, #7EA9BA 100%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3);
          transform: scale(1.05);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}

export default SignUpMember;
