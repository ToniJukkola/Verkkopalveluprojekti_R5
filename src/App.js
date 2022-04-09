import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// Import components
import Footer from "./comp/Footer";
import Navbar from "./comp/Navbar";
import Breadcrumb from './comp/Breadcrumb';
// Import pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProductsAll from "./pages/ProductsAll";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import DeleteProduct from "./pages/DeleteProduct";

const SHOP_NAME = "Vihervaja";
const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  // --- Ostoskorihommat alkaa
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  // --- Ostoskorihommat päättyy

  return (
    <>
      <div className="wrapper">
        <Router>
          <header>
            <Navbar url={BACKEND_URL} shopname={SHOP_NAME} cart={cart} />
            <Breadcrumb url={BACKEND_URL} />
          </header>

          <Routes>
            <Route path="/" element={<Home url={BACKEND_URL} />} />
            <Route path="/ota-yhteytta" element={<Contact />} />
            <Route path="/tuotteet/:categoryID" element={<Products url={BACKEND_URL} addToCart={addToCart} />} />
            <Route path="/kaikki-tuotteet" element={<ProductsAll url={BACKEND_URL} addToCart={addToCart} />} />
            <Route path="/tuotteet/:categoryID/tuote/:productID" element={<Product url={BACKEND_URL} addToCart={addToCart} />} />
            <Route path="/Admin" element={<Admin url={BACKEND_URL} />} />
            <Route path="/Admin/AddProduct" element={<AddProduct url={BACKEND_URL} />} />
            <Route path="/Admin/AddCategory" element={<AddCategory url={BACKEND_URL} />} />
            <Route path="/Admin/DeleteProduct" element={<DeleteProduct url={BACKEND_URL} />} />
          </Routes>

          <Footer shopname={SHOP_NAME} />
        </Router>
      </div>
    </>
  );
}

export default App;
