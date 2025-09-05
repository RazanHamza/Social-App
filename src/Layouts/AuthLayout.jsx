import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const AuthLayout = () => {
    return (
        <>
        <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default AuthLayout;
