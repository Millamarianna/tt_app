import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the pages
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import AdminCustomers from "./pages/AdminCustomers";
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import UserAppt from './pages/UserAppt';
import AdminAppointments from './pages/AdminAppointments';
import AdminCreateAppointments from './pages/AdminCreateAppointments';
import UserCreateAppt from './pages/UserCreateAppt';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
// Import the components
import Layout from '../components/Layout';
import RequireAuthentication from '../components/RequireAuthentication';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />

          <Route element={<RequireAuthentication />}>
            <Route path="user" element={<User />} />
            <Route path="appt" element={<UserAppt />} />
            <Route path="createappt" element={<UserCreateAppt />} />
            <Route path="admin" element={<Admin />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="createappointments" element={<AdminCreateAppointments />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;