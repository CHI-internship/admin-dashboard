import React from 'react';
import SingIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import NoMatch from './components/NoMatchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/sign-in" element={<SingIn />} />
                    <Route
                        path="/admin/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/admin/change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
