import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer({ shopname, categories }) {
    return (
        <footer className="container-fluid">
            <div>
                <div className="footer-title">{shopname}</div>
                <p>Katunimi 13,<br />
                    00000 Kaupunki</p>
            </div>
            <div>
                <div className="footer-title">Sivukartta</div>
                <ul className="list-unstyled">
                    {categories.map(category => (
                        <li key={category.trnro}>
                            {<Link to={"/tuotteet/" + category.trnro}>{category.trnimi}
                            </Link>}
                        </li>
                    ))}
                </ul>
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
