import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import Home from './screens/Home';
import AdminHome from './screens/AdminHome';
import AdminCustomers from './screens/AdminCustomers';
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={AdminHome} />
          <Route path="/customers" component={AdminCustomers} />
      </div>
      <div>Hi</div>
      </div>
  ); 
}


export default App;
