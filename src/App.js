import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// Import components
import Footer from "./comp/Footer";
import Navbar from "./comp/Navbar";
// Import pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductsAll from "./pages/ProductsAll";
import Admin from "./pages/Admin";
import Breadcrumb from './comp/Breadcrumb';

const SHOP_NAME = "Vihervaja";
const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <Navbar url={BACKEND_URL} shopname={SHOP_NAME} />
          <Breadcrumb />
          <main className="container">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ota-yhteytta" element={<Contact />} />
              <Route path="/tuotteet/:categoryID" element={<Products url={BACKEND_URL} />} />
              <Route path="/tuotteet/" element={<ProductsAll url={BACKEND_URL} />} />
              <Route path="/Admin" element={<Admin />} />
            </Routes>

          </main>

          <Footer shopname={SHOP_NAME} />
        </Router>
      </div>
    </>
  );
}

export default App;
