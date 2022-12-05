import NoMatch from './components/NoMatchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequestList from './components/requests/RequestList';
import Header from './components/header/Header';
import { SignIn, ForgotPassword, ResetPassword, UpdatePassword } from './components/auth';
import RequestPage from './components/requests/RequestPage/RequestPage';
import { RequestContext, useRequests } from './context/request.context';
import { Notifications } from './components/notification/Notifications';


function App() {
    return (
        <div>
            <RequestContext.Provider value={useRequests()}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/admin/sign-in" element={<SignIn />} />
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
                            path="/admin/request"
                            element={<RequestList />}
                        />
                        <Route
                            path="/admin/request/:id"
                            element={<RequestPage />}
                        />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                    <Notifications />
                </BrowserRouter>
            </RequestContext.Provider>
        </div>
    );
}

export default App;
