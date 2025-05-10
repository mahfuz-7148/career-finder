import React from 'react';
import Nav from "../Components/Nav.jsx";
import Footer from "../Components/Footer.jsx";
import Hero from "../Components/Hero.jsx";
import CompanyItems from "../Pages/CompanyItems.jsx";
import Testimonial from "../Components/Testimonial.jsx";
import Motion from "../Components/Motion.jsx";
import {Helmet} from "react-helmet-async";


const RootLayout = () => {
    return (
        <div className='comic bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'>
        <Helmet>
            <title>
                Home
            </title>
        </Helmet>
                <nav className='sticky top-0 z-50 backdrop-blur-md'>
                    <Nav />
                </nav>
            <header>
                <Hero />
            </header>
            <main>
                <CompanyItems />
                <Testimonial />
                <Motion />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;