import React from 'react';
import { Carousel, Card, Row, Col, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import homePage1 from '../../assets/images/home1.jpg';
import homePage2 from '../../assets/images/home2.jpg';
import specialist1 from '../../assets/images/specialist1.jpg';
import specialist2 from '../../assets/images/specialist2.jpg';
import specialist3 from '../../assets/images/specialist3.jpg';
import specialist4 from '../../assets/images/specialist4.jpeg';
import specialist5 from '../../assets/images/specialist5.jpeg';
import specialist6 from '../../assets/images/specialist6.jpeg';
import sectionImage from '../../assets/images/section-image.png';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const specialists = [
  {
    title: 'Channel a Physician',
    description: 'A Physician specializes in diagnosing and treating a wide range of conditions through non-surgical methods. Get expert advice for your general health concerns.',
    img: specialist1,
  },
  {
    title: 'Channel a Cardiologist',
    description: 'Cardiologists are experts in heart health. They diagnose and treat conditions related to the heart and blood vessels, ensuring your cardiovascular system stays in top shape.',
    img: specialist2,
  },
  {
    title: 'Channel a Neurologist',
    description: 'Neurologists specialize in the nervous system, including the brain and spinal cord. They are key in diagnosing and managing neurological disorders.',
    img: specialist3,
  },
  {
    title: 'Channel a Pediatrician',
    description: 'Pediatricians provide specialized care for children, addressing their physical, emotional, and social health from infancy through adolescence.',
    img: specialist4,
  },
  {
    title: 'Channel a Gynecologist',
    description: 'Gynecologists focus on women’s health, particularly reproductive health. They provide care for a wide range of conditions affecting the female reproductive system.',
    img: specialist5,
  },
  {
    title: 'Channel a Dermatologist',
    description: 'Dermatologists specialize in skin health, diagnosing and treating conditions related to the skin, hair, and nails. Keep your skin healthy with expert care.',
    img: specialist6,
  },
];

const Home = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleBookingClick = () => {
    navigate('/booking'); // Redirect to the booking appointment page
  };

  const carouselImageStyle = {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    position: 'relative',
  };

  const buttonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#D9D9D9',
    color: '#000',
    border: 'none',
    borderRadius: '25px', // Slightly curved border
    width: '153px', // Button width
    height: '51px', // Button height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px', // Updated font size
    fontWeight: 'bold', // Makes the text bold
    fontFamily: 'Calibri, sans-serif', // Font style Calibri
    padding: '0',
    boxShadow: 'inset 3px 3px 5px rgba(0, 0, 0, 0.3)', // Inner shadow effect
    zIndex: '10', // Ensure button is on top of other elements
    cursor: 'pointer', // Ensures the cursor changes to a pointer
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  };

  const buttonHoverStyle = {
    backgroundColor: '#C0C0C0', // New background color when hovering
  };

  const specialistImageStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 auto',
  };

  const cardBodyStyle = {
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '35px',
  };

  const cardStyle = {
    height: '100%',
  };

  const sectionImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  // State to handle hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <div>
      <NavBar />
        <Carousel>
          <Carousel.Item>
            <div style={{ position: 'relative' }}>
              <img
                className="d-block w-100"
                src={homePage1}
                alt="Advanced Healthcare Solutions"
                style={carouselImageStyle}
              />
              <Button
                style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                onClick={handleBookingClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                BOOKING
              </Button>
              <Carousel.Caption>
                <h3>Advanced Healthcare Solutions</h3>
                <p>Innovative and personalized care for all your health needs.</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ position: 'relative' }}>
              <img
                className="d-block w-100"
                src={homePage2}
                alt="Comprehensive Health Services"
                style={carouselImageStyle}
              />
              <Button
                style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                onClick={handleBookingClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                BOOKING
              </Button>
              <Carousel.Caption>
                <h3>Comprehensive Health Services</h3>
                <p>Connecting you with top specialists for every healthcare need.</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>

        <Container className="mt-6">
          <div className="py-5">
            <h2 style={{ fontSize: '26px', color: '#444444', whiteSpace: 'nowrap', fontFamily: 'Calibri, sans-serif' }}>
              Welcome to Our Healthcare System
            </h2>
            <p style={{ textAlign: 'justify' }}>
              Our healthcare system is dedicated to providing high-quality, patient-centered care, ensuring that every individual receives the attention and treatment they deserve. We offer a comprehensive range of services tailored to meet your health needs at every stage of life, from infancy through to the elderly years. Whether you’re seeking routine checkups to maintain your health, specialized treatment for a specific condition, or immediate care during an emergency, our team of experienced professionals is here to support you.
            </p>
            <p className="mt-2" style={{ textAlign: 'justify' }}>
              We are committed to leveraging the latest advancements in medical technology and employing the most effective practices to ensure you receive the highest standard of care. Our state-of-the-art facilities are equipped with cutting-edge technology to diagnose and treat various health conditions efficiently. Coupled with our compassionate and skilled staff, who are dedicated to creating a supportive and empathetic environment, we work together seamlessly to foster a healing atmosphere for you and your loved ones.
            </p>
          </div>
        </Container>

        <Container>
          <div className="mt-4">
            <h2 style={{ fontSize: '26px', color: '#444444', whiteSpace: 'nowrap', fontFamily: 'Calibri, sans-serif' }}>
              TOP SPECIALIST
            </h2>
            <Row className="mt-4">
              {specialists.map((specialist, index) => (
                <Col md={4} className="mb-4" key={index}>
                  <Card style={cardStyle}>
                    <Card.Body style={cardBodyStyle}>
                      <Card.Img variant="top" src={specialist.img} style={specialistImageStyle} />
                      <Card.Title className='mt-3'>{specialist.title}</Card.Title>
                      <Card.Text className='mt-3'>{specialist.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>

        <Container>
          <div className="my-5">
            <Row className="align-items-center">
              <Col lg={6}>
                <img src={sectionImage} alt="Our Commitment to You" style={sectionImageStyle} />
              </Col>
              <Col lg={6}>
                <p style={{ textAlign: 'justify' }}>
                  Your health and well-being are of utmost importance to us. We strive to provide personalized and comprehensive healthcare services that are tailored to meet your unique needs and preferences. Our dedicated team, consisting of experienced specialists, compassionate nurses, and skilled support staff, works together seamlessly to ensure that you receive the highest standard of care possible.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  From preventative care to advanced treatment options, we are here to support you on your health journey. Trust us to be your partner in health, providing compassionate and effective care every step of the way.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
