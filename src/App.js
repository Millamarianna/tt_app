import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AdminCustomers from "./screens/AdminCustomers";

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
        <Route path="customers" element={<AdminCustomers />} />
      </Route>
    </Routes>
  </BrowserRouter>
     
  ); 
}


export default App;
