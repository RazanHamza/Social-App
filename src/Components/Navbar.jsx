import React, { useContext } from 'react';
import {Navbar as Navbarhero, NavbarBrand, NavbarContent, NavbarItem, Button, useCode} from "@heroui/react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from '../assets/Context/AuthContext';
const Navbar = () => {
    const {isLoggedIn,setIsLoggedIn,setUserData}= useContext(AuthContext)
    const navigate=useNavigate();
    function logout(){
        localStorage.removeItem('token');
        setIsLoggedIn(null)
        setUserData(null)
        navigate('/login')

    }
    
    
    return (
        <>
        <Navbarhero>
  <NavbarBrand>
    <Link className="font-bold text-inherit" to="/">
      Linked Posts
    </Link>
  </NavbarBrand>

  <NavbarContent className="hidden sm:flex gap-4" justify="center">
    {isLoggedIn ? (
      <>
        <NavbarItem>
          <NavLink color="foreground" to="/" onClick={logout}>
            Logout
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" to="/profile">
            Your Profile
          </NavLink>
        </NavbarItem>
      </>
    ) : (
      <>
        <NavbarItem>
          <NavLink color="foreground" to="/login">
            Login
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" to="/register">
            Signup
          </NavLink>
        </NavbarItem>
      </>
    )}
  </NavbarContent>
</Navbarhero> 
        </>
    );
}

export default Navbar;
