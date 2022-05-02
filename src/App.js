import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import axios from 'axios';
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
import Search from './pages/Search';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Admin from "./admin/Admin";
import AddProduct from "./admin/AddProduct";
import AddCategory from "./admin/AddCategory";
import Edit from "./admin/Edit";
import EditProduct from "./admin/EditProduct";

const SHOP_NAME = "Vihervaja";
const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  // --- Kategorioiden haku naviin, footeriin ja admin-paneeliin
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL + "products/get_categories.php")
      .then((response) => {
        const json = response.data;
        setCategories(json);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, []);

  // --- Kirjautuminen
  const [token, setToken] = useState("");

  function login(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(JSON.parse(sessionStorage.getItem("token")));
  }

  useEffect(() => {
    if ("token" in sessionStorage) {
      setToken(JSON.parse(sessionStorage.getItem("token")));
    }
  }, [])

  // --- Ostoskorihommat alkaa
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if ("cart" in localStorage) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])

  function addToCart(product, amount) {
    if (cart.some(item => item.tuotenro === product.tuotenro)) {
      const existingProduct = cart.filter(item => item.tuotenro === product.tuotenro);
      updateAmount(parseInt(existingProduct[0].amount) + Number(amount), product);
      setAmount(1);
    } else {
      product["amount"] = Number(amount);
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setAmount(1);
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
            <Navbar url={BACKEND_URL} shopname={SHOP_NAME} cart={cart} categories={categories} token={token} setToken={setToken} />
            <Breadcrumb url={BACKEND_URL} categories={categories} />
          </header>
          <main className="container">

            <Routes>
              {/* ----- REKISTERÖITYMINEN & KIRJAUTUMINEN */}
              <Route path="/rekisteroidy" element={<Register url={BACKEND_URL} />} />
              <Route path="/kirjaudu" element={<Login url={BACKEND_URL} login={login} token={token} />} />
              <Route path="/kirjaudu-ulos" element={<Logout />} />

              {/* ------ PERUSNAVIGAATIO */}
              <Route path="/" element={<Home url={BACKEND_URL} />} />
              <Route path="/ota-yhteytta" element={<Contact />} />
              <Route path="/tuotteet/:categoryID" element={<Products url={BACKEND_URL} addToCart={addToCart} amount={amount} setAmount={setAmount} />} />
              <Route path="/kaikki-tuotteet" element={<ProductsAll url={BACKEND_URL} addToCart={addToCart} amount={amount} />} />
              <Route path="/tuotteet/:categoryID/tuote/:productID" element={<Product url={BACKEND_URL} addToCart={addToCart} amount={amount} setAmount={setAmount} />} />
              <Route path="/ostoskori" element={<Order url={BACKEND_URL} cart={cart} removeFromCart={removeFromCart} updateAmount={updateAmount} emptyCart={emptyCart} token={token} />} />
              <Route path="/haku/:searchTerm" element={<Search url={BACKEND_URL} addToCart={addToCart} />} />
              <Route path="/omat-tiedot" element={<Profile url={BACKEND_URL} token={token} />} />

              {/* ----- ADMIN */}
              <Route path="/Admin" element={<Admin url={BACKEND_URL} />} />
              <Route path="/Admin/AddProduct" element={<AddProduct url={BACKEND_URL} />} />
              <Route path="/Admin/AddCategory" element={<AddCategory url={BACKEND_URL} categories={categories} setCategories={setCategories} />} />
              <Route path="/Admin/Edit" element={<Edit url={BACKEND_URL} />} />
              <Route path="/Admin/EditProduct/:productID" element={<EditProduct url={BACKEND_URL} />} />
            </Routes>

          </main>

          <Footer shopname={SHOP_NAME} categories={categories} token={token} setToken={setToken} />
        </Router>
      </div>
    </>
  );
}

export default App;
