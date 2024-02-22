import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthProvider';
import './tt_index.css';
import { TerapiaTerttu } from './TerapiaTerttu.js';


function TerttuIndex() {
    return (
  <React.StrictMode>
    <AuthProvider>
      <TerapiaTerttu />
    </AuthProvider>
  </React.StrictMode>
  );
}


export default TerttuIndex;