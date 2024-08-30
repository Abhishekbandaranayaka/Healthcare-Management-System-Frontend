import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import AdminDashboard from "./module/admin/admindashboard/AdminDashboard";
import Layout from "./layout/Layout";
import Layout2 from "./layout/Layoutdefault";
import DoctorDashboard from "./module/doctor/doctordashboard/DoctorDashboard";
import OperatorDashboard from "./module/operators/operatordashboard/OperatorDashboard";
import Home from './pages/homePage/Home';
import SignupForm from './pages/signUp/SignUp';
import DoctorList from "./components/DoctorList/DoctorList";
import PatientList from "./components/PatientList/PatientList";
import FAQ from "./pages/Faq/faq";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/header" element={<NavBar />}/>
            <Route path="/footer" element={<Footer />}/>
            <Route path="/sidebar" element={<SideBar />}/>
            <Route path="/signup" element={<SignupForm />}/>
            {/* <Route path="/" element={<Home />}/> */}
            {/*<Route path="/doctor-list" element={<DoctorList/>}/>*/}
            <Route path="/patient-list" element={<PatientList/>}/>

            <Route path="/admin/*" element={
                <Layout sections={['doctor', 'patient-doc', 'appointment', 'bill', 'medicalRecords']}>
                    <Routes>
                        <Route path="" element={<AdminDashboard />} />
                        <Route path="doctor-list" element={<DoctorList />} />
                        <Route path="patient-list" element={<PatientList/>}/>
                    </Routes>
                </Layout>
            } />
            <Route path="/doctor/*" element={
                <Layout sections={['patient', 'appointment', 'medicalRecords']}>
                    <Routes>
                        <Route path="" element={<DoctorDashboard/>}/>
                        <Route path="patient-list" element={<PatientList/>}/>
                    </Routes>
                </Layout>
            } />
            <Route path="/operator" element={
                <Layout sections={['bill', 'appointment']}>
                    <OperatorDashboard />
                </Layout>
            } />
             <Route path="/" element={
                <Layout2 >
                    <Home />
                </Layout2>
            } />
            <Route path="/faq" element={
                <Layout sections={['bill', 'appointment']}>
                    <FAQ />
                </Layout>
            } />




        </Routes>
    );
}

export default AppRoutes;
