import axios from "axios";
import React from "react";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { URL } from "./Globals";


export default function Header() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(URL + "get_categories.php")
          .then((response) => {
            setCategoryList(response.data)
          }).catch(error => {
            alert(error);
          });
    },[]);


    return (
        <>
           <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Kukkakauppa Oy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Etusivu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ota-yhteytta">Ota yhteyttä</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Tuotteet
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categoryList?.map(e => (
                                    <li key={e.trnro}><Link className="dropdown-item" to="/kategoria">{e.trnimi}</Link> </li>
                                ))}
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/tuotteet">Kaikki tuotteet</Link> </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Kirjoita hakusana"
                                aria-label="Search" />
                            <button className="btn btn-secondary btn-search" type="submit"><i className="bi bi-search"></i></button>
                        </form>
                        <div className="navbar-icons">
                            <i className="bi bi-person-circle"></i>
                            <i className="bi bi-cart"></i>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
