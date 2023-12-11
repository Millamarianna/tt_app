import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from './components/Layout';
import NoPage from "./pages/NoPage";
import AdminCustomers from "./pages/AdminCustomers";
import RequireAuthentication from './components/RequireAuthentication';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />

          <Route element={<RequireAuthentication />}>
            <Route path="admin" element={<Admin />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}


export default App;
