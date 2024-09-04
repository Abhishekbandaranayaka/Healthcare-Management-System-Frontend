import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import AppRoute from "./App.route";
import PaymentDetailsPopup from './Pages/PaymentDetails/PaymentDetailPopup';
import AppointmentTable from './components/AppointmentTable';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Router>
      <Navbar />
      <AppointmentTable onRowClick={() => setShowPopup(true)} /> 
      <PaymentDetailsPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <Footer />
    </Router>
  );
}

export default App;


