import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { CurrentUserProvider } from './context/UserProvider';
import NavBarController from './components/NavBar/NavBarController';
import App from './App';

import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CurrentUserProvider>
                    <NavBarController />
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </CurrentUserProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);


