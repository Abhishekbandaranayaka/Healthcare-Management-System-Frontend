import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT token
import backgroundImage from '../../assets/images/BG.jpg'; // Update the path if needed

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'flex-end', // Align items to the right
      alignItems: 'center',
      paddingRight: '360px', // Add some padding on the right
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
    forgotPassword: {
      display: 'block',
      textAlign: 'right',
      marginBottom: '15px',
      textDecoration: 'none',
      color: '#007BFF', // Color of the link
      fontSize: '14px',
    },
    bottomSpacing: {
      marginBottom: '30px',
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call your backend API for login
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Save the token in local storage
        localStorage.setItem('token', token);

        // Decode the JWT token to extract user role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Redirect based on role
        if (userRole === 'ADMIN') {
          navigate('/admin/*');
        } else if (userRole === 'OPERATOR') {
          navigate('/operator/*');
        } else {
          navigate('/'); // Redirect to the home page or a default page
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleCancel = () => {
    // Add your cancel logic here (e.g., reset form, navigate back, etc.)
    console.log('Cancel clicked');
  };

  return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h3 style={styles.header}>Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  style={styles.textField}
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  style={styles.textField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" style={styles.forgotPassword}>Forgot Password?</a> {/* Forgot Password link */}
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
                  onClick={handleCancel}
                  className="button-hover"
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

export default Login;
