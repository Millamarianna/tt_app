import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebDesign from "./pages/WebDesign";
import Front from './components/Front';
import Packages from './pages/Packages';

//Terapiaterttu
import Layout from './terapiaterttu/src/components/Layout';
import Home from './terapiaterttu/src/pages/Home';
import NoPage from "./terapiaterttu/src/pages/NoPage";
import AdminCustomers from "./terapiaterttu/src/pages/AdminCustomers";
import RequireAuthentication from './terapiaterttu/src/components/RequireAuthentication';
import Admin from './terapiaterttu/src/pages/Admin';
import Login from './terapiaterttu/src/pages/Login';
import Register from './terapiaterttu/src/pages/Register';
import User from './terapiaterttu/src/pages/User';
import UserAppt from './terapiaterttu/src/pages/UserAppt';
import AdminAppointments from './terapiaterttu/src/pages/AdminAppointments';
import AdminCreateAppointments from './terapiaterttu/src/pages/AdminCreateAppointments';
import UserCreateAppt from './terapiaterttu/src/pages/UserCreateAppt';
import Page1 from './terapiaterttu/src/pages/Page1';
import Page2 from './terapiaterttu/src/pages/Page2';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />}>
          <Route index element={<Packages />} />
          <Route path="webdesign" element={<WebDesign />} />
        </Route>

        <Route path="terttu" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
          <Route path="user" element={<User />} />
          <Route path="appt" element={<UserAppt />} />
          <Route path="createappt" element={<UserCreateAppt />} />
          <Route path="admin" element={<Admin />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="createappointments" element={<AdminCreateAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
