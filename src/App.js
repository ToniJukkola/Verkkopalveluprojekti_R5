import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "./comp/Globals";
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
  const [categoryCheck, setCategoryCheck] = useState(0);
  const [productCheck, setProductCheck] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get(URL + "get_categories.php")
      .then((response) => {
        setCategoryList(response.data)
      }).catch(error => {
        alert(error);
      });
  },[categoryCheck,productCheck]);

  useEffect(() => {
    axios.get(URL + "get_products.php?id=" + categoryCheck
    )
      .then((response) => {
        setProductList(response.data)
      }).catch(error => {
        alert(error);
      });
  },[categoryCheck,productCheck]);


  function handleClick(category,product){
    if(category !== null){
      setCategoryCheck(category);
    }
    if(product !== null){
      setProductCheck(product);
    }
  }

  return (
    <div className="wrapper">
      <Router>
        <Header handleClick = {handleClick} categoryList= {categoryList} />
        <div><Link className="navbar-brand" to="/">Etusivu</Link> - - <Link className="navbar-brand" to="/tuote">Missä nyt: {categoryCheck + " " + productCheck}</Link></div>

        <main className="container">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tietoa" element={<About />} />
            <Route path="/ota-yhteytta" element={<Contact />} />
            <Route path="/tuote" element={<Product />} />
            <Route path="/kategoria" element={<Category productList= {productList} />} />
            <Route path="/tuotteet" element={<Products />} />
          </Routes>
        
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
