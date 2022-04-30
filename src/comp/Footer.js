import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer({ shopname, categories, token, setToken }) {
    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.clear();
        setToken("");
      }
    return (
        <footer className="container-fluid">
            <div>
                <div className="footer-title">{shopname}</div>
                <p>Katunimi 13,<br />
                    00000 Kaupunki</p>
            </div>
            <div>
                <div className="footer-title">Sivukartta</div>
                <div className="d-flex gap-4">
                    <ul className="list-unstyled">
                        <li className="footer-list-title">Tuoteryhmät</li>
                        {categories.map(category => (
                            <li key={category.trnro}>
                                {<Link to={"/tuotteet/" + category.trnro}>{category.trnimi}
                                </Link>}
                            </li>
                        ))}
                    </ul><ul className="list-unstyled">
                        <li className="footer-list-title">Muuta</li>
                        <li><Link to={"/"}>Etusivu</Link></li>
                        <li><Link to={"/ota-yhteytta"}>Ota yhteyttä</Link></li>
                    </ul>
                    <ul className="list-unstyled">
                        <li className="footer-list-title">Kanta-asiakkaille</li>
                        {!token 
                        ? <li><Link to={"/kirjaudu"}>Kirjaudu sisään</Link></li>
                        : <><li><Link to={"/kirjaudu-ulos"} onClick={logout}>Kirjaudu ulos</Link></li>
                        <li><Link to={"/omat-tiedot"}>Omat tiedot</Link></li></>
                        }
                    </ul>
                </div>
            </div>
            <div>
                <div className="footer-title">Seuraa meitä sosiaalisessa mediassa!</div>
                <div className="footer-social-media">
                    <a href="https://google.com"><i className="bi bi-facebook"></i></a>
                    <a href="https://google.com"><i className="bi bi-instagram"></i></a>
                    <a href="https://google.com"><i className="bi bi-youtube"></i></a>
                </div>
            </div>
        </footer>
    )
}
