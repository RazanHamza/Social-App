import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
    return (
        <>
         <Navbar/>
         <div className='bg-gray-100 min-h-screen pt-4'>
              <Outlet/>
         </div>
       
         <Footer/>   
        </>
    );
}

export default MainLayout;
