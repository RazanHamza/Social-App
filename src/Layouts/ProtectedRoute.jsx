import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../assets/Context/AuthContext';



export default function ProtectedRoute({children}){

let {isLoggedIn}=useContext(AuthContext)
return isLoggedIn ? children: <Navigate to={'./login'}/>

}
