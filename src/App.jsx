import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';
import FeedPage from './Pages/feedPage';
import NoteFoundPage from './Pages/NoteFoundPage';
import PostDetailsPage from './Pages/PostDetailsPage';
import ProfilePage from './Pages/ProfilePage';
import ProtectedRoute from './Layouts/ProtectedRoute';
import AuthProtectedRoute from './Layouts/AuthProtectedRoute';


const App = () => {
  const router = createBrowserRouter([
    {
      path: '', element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
        { path: 'post-details/:id', element: <ProtectedRoute><PostDetailsPage /></ProtectedRoute> },
        { path: '*', element: <NoteFoundPage /> }
      ]
    },
    {
      path: '', element: <AuthLayout />, children: [
        { path: 'register', element: <AuthProtectedRoute><Register /> </AuthProtectedRoute>},
        { path: 'login', element:<AuthProtectedRoute> <Login /></AuthProtectedRoute> },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />


    </>
  );
}

export default App;
