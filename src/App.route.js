import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/header" element={<NavBar />}/>
            <Route path="/footer" element={<Footer />}/>
            <Route path="/sidebar" element={<SideBar />}/>
        </Routes>
    );
}

export default AppRoutes;
