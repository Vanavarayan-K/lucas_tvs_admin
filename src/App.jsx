import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LogsPage from "./pages/LogsPage";
import LoginPage from "./pages/LoginPage";
import ChangePassword from "./components/ChangePassword";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from './pages/ForgotPassword'
import { useEffect, useState } from "react";
import ResetPassword from "./pages/ResetPassword";
import axios from 'axios';

export default function App() {
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsloading] = useState(true)
    useEffect(()=>{
        fetch('/config.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        ).then((response)=>{
        return response.json();
        }).then((data)=>{
          axios.defaults.baseURL = data.url
          setIsloading(false)
        })
    
      },[])
    
    return (
        <Router>
            {!token ? (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
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