import { useEffect, useState } from 'react';
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
import Order from './pages/Order';
import Admin from "./admin/Admin";
import AddProduct from "./admin/AddProduct";
import AddCategory from "./admin/AddCategory";
import DeleteProduct from "./admin/DeleteProduct";
import Search from './pages/Search';
import OrderSummary from './pages/OrderSummary';

const SHOP_NAME = "Vihervaja";
const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  // --- Ostoskorihommat alkaa
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if ("cart" in localStorage) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])

  function addToCart(product) {
    if (cart.some(item => item.tuotenro === product.tuotenro)) {
      const existingProduct = cart.filter(item => item.tuotenro === product.tuotenro);
      updateAmount(parseInt(existingProduct[0].amount) + 1, product);
    } else {
      product["amount"] = 1;
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  function removeFromCart(product) {
    const itemsWithoutRemoved = cart.filter(item => item.tuotenro !== product.tuotenro);
    setCart(itemsWithoutRemoved);
    localStorage.setItem("cart", JSON.stringify(itemsWithoutRemoved));
  }

  function updateAmount(amount, product) {
    product.amount = amount;
    const index = cart.findIndex((item => item.tuotenro === product.tuotenro));
    const modifiedCart = Object.assign([...cart], { [index]: product });
    setCart(modifiedCart);
    localStorage.setItem("cart", JSON.stringify(modifiedCart));
  }

  function emptyCart() {
    setCart([]);
    localStorage.removeItem("cart");
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
            <Route path="/ostoskori" element={<Order url={BACKEND_URL} cart={cart} removeFromCart={removeFromCart} updateAmount={updateAmount} emptyCart={emptyCart} />} />
            <Route path="/haku/:searchTerm" element={<Search url={BACKEND_URL} addToCart={addToCart} />} />
            <Route path="/yhteenveto-tilauksesta/:orderID" element={<OrderSummary url={BACKEND_URL} />} />
            
            {/* ----- ADMIN */}
            <Route path="/Admin" element={<Admin url={BACKEND_URL} />} />
            <Route path="/Admin/AddProduct" element={<AddProduct url={BACKEND_URL} />} />
            <Route path="/Admin/AddCategory" element={<AddCategory url={BACKEND_URL} />} />
            <Route path="/Admin/DeleteProduct" element={<DeleteProduct url={BACKEND_URL} />} />
          </Routes>

          <Footer shopname={SHOP_NAME} url={BACKEND_URL} />
        </Router>
      </div>
    </>
  );
}

export default App;
