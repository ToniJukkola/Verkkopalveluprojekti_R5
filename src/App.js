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
import Contact from './comp/pages/Contact';
import Product from './comp/pages/Product';
import Category from "./comp/pages/Category";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tietoa" element={<About />} />
          <Route path="/ota-yhteytta" element={<Contact />} />
          <Route path="/tuote" element={<Product />} />
          <Route path="/kategoria" element={<Category />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
