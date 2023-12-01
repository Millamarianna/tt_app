import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './screens/Home';
import Admin_home from './screens/Admin_home';
import Layout from "./components/Layout";

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout content={<Home/>} />} />
        <Route path="/admin" element={<Layout content={<Admin_home/>} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
