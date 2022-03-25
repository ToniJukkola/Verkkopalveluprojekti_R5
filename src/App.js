import React, { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import './App.css';

import Footer from './comp/Footer';
import Header from './comp/Header';

import About from "./pages/About";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Product from "./pages/Product";
import Category from "./pages/Category";
import Products from "./pages/Products";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div><Link className="navbar-brand" to="/">Etusivu</Link> - - <Link className="navbar-brand" to="/tuote">Missä nyt</Link></div>

        <main className="container">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tietoa" element={<About />} />
          <Route path="/ota-yhteytta" element={<Contact />} />
          <Route path="/tuote" element={<Product />} />
          <Route path="/kategoria" element={<Category />} />
          <Route path="/tuotteet" element={<Products />} />
        </Routes>
        
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
