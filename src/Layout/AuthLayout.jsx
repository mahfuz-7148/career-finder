import React from 'react';
import Nav from "../Components/Nav.jsx";
import {Outlet} from "react-router";
import Footer from "../Components/Footer.jsx";

const AuthLayout = () => {
    return (
        <div className='comic bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'>
            <nav className='sticky top-0 z-50 backdrop-blur-md'>
                <Nav />
            </nav>
            <main>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default AuthLayout;