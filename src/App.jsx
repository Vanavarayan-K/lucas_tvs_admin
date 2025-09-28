import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LogsPage from "./pages/LogsPage";
import LoginPage from "./pages/LoginPage";
import ChangePassword from "./components/ChangePassword";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from './pages/ForgotPassword'

export default function App() {
    const token = useSelector((state) => state.auth.token);

    return (
        <Router>
            {!token ? (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot" element={<ForgotPassword/>}/>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/logs" element={<LogsPage />} />
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        <Route path="change-password" element={<ChangePassword/>}/>
                    </Routes>
                </Layout>
            )}
        </Router>
    );
}