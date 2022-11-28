import SingIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NoMatch from './components/NoMatchPage';
import UpdatePassword from './components/UpdatePassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Requests from './components/Requests';
import Request from './components/Request';
import Header from './components/header/Header';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/admin/sign-in" element={<SingIn />} />
                    <Route
                        path="/admin/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/admin/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/admin/update-password"
                        element={<UpdatePassword />}
                    />
                    <Route
                        path="/admin/requests"
                        element={<Requests />}
                    />
                    <Route
                        path="/admin/request/:id"
                        element={<Request />}
                    />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
