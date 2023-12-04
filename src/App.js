import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './screens/Home';
import AdminHome from './screens/AdminHome';
import AdminCustomers from './screens/AdminCustomers';
import Layout from "./components/Layout";

function App() {
  
  return (<BrowserRouter>
  <Routes>
<Route path="/" element={<Layout content={<Home />} />} />
<Route path="/admin" element={<Layout content={<AdminHome />} />} />
<Route path="/customers" element={<Layout content={<AdminCustomers />} />} />
  </Routes>
</BrowserRouter>
    
  );
}

export default App;
