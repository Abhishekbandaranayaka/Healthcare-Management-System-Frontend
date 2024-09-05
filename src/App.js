import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from "./App.route";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Router>
      <AppRoute/>
    </Router>
  );
}

export default App;


