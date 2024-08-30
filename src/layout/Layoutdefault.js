import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
function Layout2({ children }) {
    return(
        <div>
            <NavBar />
            <div>
                <div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Layout2;