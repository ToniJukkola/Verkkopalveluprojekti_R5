import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';

import Footer from './comp/Footer';
import Header from './comp/Header';
import About from "./comp/pages/About";

import Home from './comp/pages/Home';


function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
