import React from "react";


export default function Footer() {
    return(
        <footer className="container-fluid">
        <div>
            <div className="footer-title">Kukkakauppa Oy</div>
            <p>Katunimi 13,<br />
            00000 Kaupunki</p>
        </div>
        <div>
            <div className="footer-title">Sivukartta</div>
            <ul className="list-unstyled">
                <a href="https://google.com"><li>Viherkasvit</li></a>
                <a href="https://google.com"><li>Mehikasvit</li></a>
                <a href="https://google.com"><li>Kaktukset</li></a>
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
    );
}
