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
<<<<<<< HEAD
import Product from "./comp/pages/Product";
=======
import Product from './comp/pages/Product';
import Category from "./comp/pages/Category";
>>>>>>> 66a43e1f49814bc7b039abfaccefae112bb58f70

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tietoa" element={<About />} />
          <Route path="/ota-yhteytta" element={<Contact />} />
<<<<<<< HEAD
          <Route path="tuotesivu" element={<Product />} />
=======
          <Route path="/tuote" element={<Product />} />
          <Route path="/kategoria" element={<Category />} />
>>>>>>> 66a43e1f49814bc7b039abfaccefae112bb58f70
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
