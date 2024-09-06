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
import Login from './pages/login/Login';
import AppointmentList from "./components/AppointmentList/AppointmentList";
import FAQ from "./pages/Faq/faq";
import Details from "./pages/patientDetails/patientDetails";
import DoctorProfileWithBookings from "./pages/booking-information/BookingInformation";
import SignUpMember from "./pages/signUpMember/SignUpMember";
import MedicalRecordList from "./components/MedicalRecordList/MedicalRecordList";
import AppointmentBooking from './pages/booking/Booking';
import SearchResults from './pages/search Results/searchResults';
import BillList from "./components/BillList/BillList";




function AppRoutes() {
    return (
        <Routes>
            <Route path="/header" element={<NavBar />}/>
            <Route path="/footer" element={<Footer />}/>
            <Route path="/sidebar" element={<SideBar />}/>
            <Route path="/doctor-list" element={<DoctorList/>}/>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/patient-list" element={<PatientList/>}/>
            <Route path="/appointment-list" element={<AppointmentList/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/signup-member" element={<SignUpMember/>}/>
            <Route path="/medical-records" element={<MedicalRecordList/>}/>
            <Route path="/booking" element={<AppointmentBooking />} />
            <Route path="/search results" element={<SearchResults />} />
            <Route path="/bill-list" element={<BillList/>} />



            <Route path="/admin/*" element={
                <Layout sections={['doctor', 'patient-admin', 'appointment-admin', 'bill', 'medicalRecords-admin']}>
                    <Routes>
                        <Route path="" element={<AdminDashboard />} />
                        <Route path="doctor-list" element={<DoctorList />} />
                        <Route path="patient-list" element={<PatientList/>}/>
                        <Route path="appointment-list" element={<AppointmentList/>}/>
                        <Route path="medical-records" element={<MedicalRecordList/>}/>
                        <Route path="bill-list" element={<BillList/>}/>
                    </Routes>
                </Layout>
            } />
            <Route path="/doctor/*" element={
                <Layout sections={['appointment-operator', 'medicalRecords-doctor']}>
                    <Routes>
                        <Route path="" element={<DoctorDashboard/>}/>
                        <Route path="medical-records" element={<MedicalRecordList/>}/>
                        <Route path="appointment-list" element={<AppointmentList/>}/>
                    </Routes>
                </Layout>
            } />


             <Route path="/" element={
                <Layout2 >
                    <Home />
                </Layout2>
            } />
             <Route path="/details" element={
                <Layout2 >
                    <Details />
                </Layout2>
            } />
            <Route path="/bookinginformation" element={
                <Layout2 >
                    <DoctorProfileWithBookings />
                </Layout2>
            } />
            <Route path="/faq" element={
                <Layout2>
                    <FAQ />
                </Layout2>
            } />




        </Routes>
    );
}

export default AppRoutes;
