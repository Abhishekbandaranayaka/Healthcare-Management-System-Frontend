import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import AdminDashboard from "./module/admin/admindashboard/AdminDashboard";
import Layout from "./layout/Layout";
import DoctorDashboard from "./module/doctor/doctordashboard/DoctorDashboard";
import OperatorDashboard from "./module/operators/operatordashboard/OperatorDashboard";
import DoctorList from "./components/DoctorList/DoctorList";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/header" element={<NavBar />}/>
            <Route path="/footer" element={<Footer />}/>
            <Route path="/sidebar" element={<SideBar />}/>
            <Route path="/doctor-list" element={<DoctorList />}/>

            <Route path="/admin" element={
                <Layout sections={['doctor', 'patient', 'appointment', 'bill', 'medicalRecords']}>
                    <AdminDashboard />
                </Layout>
            } />
            <Route path="/doctor" element={
                <Layout sections={['patient', 'appointment', 'medicalRecords']}>
                    <DoctorDashboard />
                </Layout>
            } />
            <Route path="/operator" element={
                <Layout sections={['bill', 'appointment']}>
                    <OperatorDashboard />
                </Layout>
            } />

        </Routes>
    );
}

export default AppRoutes;
