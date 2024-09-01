import React from 'react';
import { Form, Button } from 'react-bootstrap';
import backgroundImage from '../../assets/images/BG.jpg'; // Update the path if needed

function SignUp() {
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
      padding: '30px', // Increased padding
      borderRadius: '50px', // Updated border radius
      backgroundColor: '#D9D9D9', // Updated background color
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Calibri, sans-serif', // Font family applied
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Times New Roman, serif', // Font family for header
      fontWeight: 'bold', // Bold text
    },
    button: {
      width: '135px',
      height: '46px',
      borderRadius: '23px', // Half of height to make it circular
      background: `linear-gradient(
        to bottom, 
        rgba(126, 169, 186, 1) 0%, 
        rgba(126, 169, 186, 0.5) 50%, 
        rgba(126, 169, 186, 1) 100%
      )`,
      border: '1px solid #9AB4C6', // Light border color similar to button color
      color: 'rgba(0, 0, 0, 0.8)', // Font color to black with 80% opacity
      fontWeight: 'bold',
      fontSize: '19px', // Font size for buttons
      textAlign: 'center',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(0, 0, 0, 0.2)', // Embossed effect
      transition: 'all 0.3s ease', // Smooth transition for hover effects
      fontFamily: 'Calibri, sans-serif', // Font family applied 
      position: 'relative', // For the shine effect
      overflow: 'hidden',
    },
    buttonHover: {
      background: 'linear-gradient(to bottom, #7EA9BA 0%, #7EA9BA 50%, #7EA9BA 100%)', // Gradient for 3D look on hover
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced embossed effect on hover
      transform: 'scale(1.05)', // Slightly enlarge button on hover
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center', // Center align the buttons
      alignItems: 'center', // Center vertically if needed
    },
    buttonSpacing: {
      margin: '0 40px', // Adjust space between buttons
    },
    textField: {
      backgroundColor: '#D9D9D9', // Background color of the text fields
      border: '2px solid rgba(179, 171, 171, 0.72)', // Border color with 72% opacity
      borderRadius: '8px', // Rounded corners for the border
      padding: '10px', // Added padding for better appearance
      fontFamily: 'Calibri, sans-serif', // Font family applied
    },
    bottomSpacing: {
      marginBottom: '30px', // Increased margin-bottom for space between text fields and buttons
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 style={styles.header}>Sign Up</h3>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              style={styles.textField}
              className="text-field"
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              style={styles.textField}
              className="text-field"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              style={styles.textField}
              className="text-field"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              style={styles.textField}
              className="text-field"
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              style={styles.textField}
              className="text-field"
            />
          </Form.Group>

          <div style={styles.bottomSpacing}></div> {/* Added spacing */}

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
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>

      <style jsx>{`
        .text-field::placeholder {
          color: rgba(0, 0, 0, 0.5); /* Lighter color for placeholder text */
        }

        .button-hover:hover {
          background: linear-gradient(to bottom, #7EA9BA 0%, #7EA9BA 50%, #7EA9BA 100%); /* Gradient for 3D look on hover */
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced embossed effect on hover */
          transform: scale(1.05); /* Slightly enlarge button on hover */
          cursor: pointer; /* Pointer cursor on hover */
        }
      `}</style>
    </div>
  );
}

export default SignUp;
