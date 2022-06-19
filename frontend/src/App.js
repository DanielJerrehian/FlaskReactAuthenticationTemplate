import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/Auth/RequireAuth';
import PersistLogin from './components/Auth/PersistLogin';
import { roles } from './utils/roles';

import Layout from './components/Layout/Layout';
import Home from './components/Private/Home';
import Login from './components/Auth/Login';
import Register from './components/Public/Register';
import Links from './components/Public/Links';
import About from './components/Public/About';
import LandingPage from './components/Public/LandingPage';
import Users from './components/Private/Users';
import Profile from './components/Private/Profile';
import Lounge from './components/Private/Lounge';
import Admin from './components/Admin/Admin';
import ErrorMissing from './components/Error/ErrorMissing';
import Unauthorized from './components/Auth/Unauthorized';


function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route element={<PersistLogin />}>
                    {/* Public Routes */}
                    <Route path='/' element={<LandingPage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='links' element={<Links />} />
                    <Route path='about' element={<About />} />
                    <Route path='unauthorized' element={<Unauthorized />} />

                    {/* Private Routes */}
                    <Route element={<RequireAuth allowedRoles={[roles?.User, roles?.Admin]} />}>
                        <Route path='home' element={<Home />} />
                        <Route path='users' element={<Users />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='lounge' element={<Lounge />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[roles?.Admin]} />}>
                        <Route path='admin' element={<Admin />} />
                    </Route>
                </Route>

                {/* Catch All */}
                <Route path='*' element={<ErrorMissing />} />
            </Route>
        </Routes>
    );
}

export default App;
