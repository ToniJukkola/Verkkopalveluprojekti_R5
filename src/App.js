import React, { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';

import Footer from './comp/Footer';
import Header from './comp/Header';

import About from "./pages/About";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Product from "./pages/Product";
import Category from "./pages/Category";


function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tietoa" element={<About />} />
          <Route path="/ota-yhteytta" element={<Contact />} />
          <Route path="tuotesivu" element={<Product />} />

          <Route path="/kategoria" element={<Category />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
