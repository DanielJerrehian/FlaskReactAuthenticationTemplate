import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import { roles } from './utils/roles';

import Layout from './components/Layout';
import HomeUnauthenticated from './components/HomeUnauthenticated';
import Login from './components/Login';
import Register from './components/Register';
import Links from './components/Links';
import About from './components/About';
import HomeAuthenticated from './components/HomeAuthenticated';
import Users from './components/Users';
import Profile from './components/Profile';
import Lounge from './components/Lounge';
import Admin from './components/Admin';
import ErrorMissing from './components/ErrorMissing';
import Unauthorized from './components/Unauthorized';


function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route path='/' element={<HomeUnauthenticated />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='links' element={<Links />} />
                <Route path='about' element={<About />} />
                <Route path='unauthorized' element={<Unauthorized />} />

                {/* Private Routes */}
                <Route element={<RequireAuth allowedRoles={[roles?.User, roles?.Admin]} />}>
                    <Route path='home' element={<HomeAuthenticated />} />
                    <Route path='users' element={<Users />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='lounge' element={<Lounge />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[roles?.Admin]} />}>
                    <Route path='admin' element={<Admin />} />
                </Route>

                {/* Catch All */}
                <Route path='*' element={<ErrorMissing />} />
            </Route>
        </Routes>
    );
}

export default App;
