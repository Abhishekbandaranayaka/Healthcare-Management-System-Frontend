import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import AppRoute from "./App.route";


function App() {
  return (
      <Router>
        <AppRoute />
      </Router>
  );
}

export default App;
