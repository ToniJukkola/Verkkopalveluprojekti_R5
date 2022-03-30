import React from 'react'

export default function Footer({shopname}) {
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
                    <a href="../tuotteet/1"><li>Viherkasvit</li></a>
                    <a href="../tuotteet/2"><li>Mehikasvit</li></a>
                    <a href="../tuotteet/3"><li>Kaktukset</li></a>
                    <a href="../tuotteet/4"><li>Tarvikkeet</li></a>
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
