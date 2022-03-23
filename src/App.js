import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import Footer from './comp/Footer';
import Header from './comp/Header';
import About from "./comp/pages/About";

import Home from './comp/pages/Home';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
