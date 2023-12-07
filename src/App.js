import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Layout from './components/Layout';
import NoPage from "./screens/NoPage";
import AdminCustomers from "./screens/AdminCustomers";

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
     
  ); 
}


export default App;
