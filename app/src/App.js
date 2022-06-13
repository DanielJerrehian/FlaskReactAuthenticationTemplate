import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Layout from './components/Layout';
import Links from './components/Links';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import Admin from './components/Admin';
import ErrorMissing from './components/ErrorMissing';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route path="links" element={<Links />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='about' element={<About />} />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                    <Route path='/' element={<Home />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='admin' element={<Admin />} />
                </Route>

                {/* Catch All */}
                <Route path='*' element={<ErrorMissing />} />
            </Route>
        </Routes>
    );
}

export default App;
