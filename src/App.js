import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// Import components
import Footer from "./comp/Footer";
import Navbar from "./comp/Navbar";
import Breadcrumb from './comp/Breadcrumb';
import Hero from './comp/Hero';
// Import pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProductsAll from "./pages/ProductsAll";
import Admin from "./pages/Admin";
import Add from "./pages/Add";
import AddCategory from "./pages/AddCategory";
import Delete from "./pages/Delete";

const SHOP_NAME = "Vihervaja";
const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <header>
            <Navbar url={BACKEND_URL} shopname={SHOP_NAME} />
            <Breadcrumb url={BACKEND_URL} />
          </header>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ota-yhteytta" element={<Contact />} />
              <Route path="/tuotteet/:categoryID" element={<Products url={BACKEND_URL} />} />
              <Route path="/tuotteet/kaikki" element={<ProductsAll url={BACKEND_URL} />} />
              <Route path="/tuotteet/:categoryID/tuote/:productID" element={<Product url={BACKEND_URL} />} />
              <Route path="/Admin" element={<Admin url={BACKEND_URL} />} />
              <Route path="/Admin/Add" element={<Add url={BACKEND_URL} />} />
              <Route path="/Admin/AddCategory" element={<AddCategory url={BACKEND_URL} />} />
              <Route path="/Admin/Delete" element={<Delete url={BACKEND_URL} />} />
            </Routes>

          <Footer shopname={SHOP_NAME} />
        </Router>
      </div>
    </>
  );
}

export default App;
