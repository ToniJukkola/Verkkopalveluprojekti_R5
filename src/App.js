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
import Breadcrumb from './comp/Breadcrumb';

const BACKEND_URL = "http://localhost/verkkopalveluprojekti_r5_backend/";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <Navbar url={BACKEND_URL} />
          <Breadcrumb />
          <main className="container">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ota-yhteytta" element={<Contact />} />
              <Route path="/tuotteet/:categoryID" element={<Products url={BACKEND_URL} />} />
              <Route path="/tuotteet/" element={<ProductsAll url={BACKEND_URL} />} />
            </Routes>

          </main>

          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
