import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Search from '../pages/Search';
import Cart from './Cart';

export default function Navbar({ url, shopname, cart }) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios.get(url + "products/get_categories.php")
      .then((response) => {
        const json = response.data;
        setCategories(json);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{shopname}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/" >Etusivu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ota-yhteytta">Ota yhteyttä</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Tuotteet
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* Tuotekategorioiden mappaus alkaa */}
                {categories.map(category => (
                  <li key={category.trnro}>
                    {<Link className="dropdown-item" to={"/tuotteet/" + category.trnro}>{category.trnimi}
                    </Link>}
                  </li>
                ))}
                {/* Tuotekategorioiden mappaus päättyy */}
                <hr className="dropdown-divider" />
                <Link className="dropdown-item" to={"/kaikki-tuotteet/"}>Kaikki tuotteet</Link>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Kirjoita hakusana"
              aria-label="Search" onChange={e => setSearchTerm(e.target.value)} />
            <Link to={"/haku/" + searchTerm} className="btn btn-secondary btn-search" type="submit"><i className="bi bi-search"></i></Link>
          </form>
          <div className="navbar-icons">
            <Link className="bi bi-person-circle" to={"/admin/"}></Link>
            <Link to={"/ostoskori"}><Cart cart={cart} /></Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
