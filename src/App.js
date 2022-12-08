import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ForgotPassword, ResetPassword, SignIn, UpdatePassword } from './components/auth';
import Header from './components/header/Header';
import NoMatch from './components/NoMatchPage';
import { Notifications } from './components/notification/Notifications';
import RequestList from './components/requests/RequestList';
import RequestPage from './components/requests/RequestPage/RequestPage';
import { RequestContext, useRequests } from './context/request.context';

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
