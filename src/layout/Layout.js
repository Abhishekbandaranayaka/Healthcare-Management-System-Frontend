import React from "react";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
function Layout({ children , sections }) {
    return(
        <div>
            <NavBar />
            <div className="d-flex">
                <SideBar sections={sections} />
                <div className="content-wrapper" style={{ flex: 1, padding: '20px' }}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Layout;