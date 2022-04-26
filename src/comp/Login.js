import React from "react";
import { Link } from 'react-router-dom';


export default function Login() {
    return (
        <main className="container">
           <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form>
                <label>
                    <p>Käyttäjätunnus</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Salasana</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Kirjaudu</button>
                </div>
            </form>
            </div>
            <Link to={"/rekisteroidy/"}>Rekisteröidy</Link>
            <div>
                <Link to={"/admin/"}>Admin Paneeliin</Link>
            </div>
        </main>
        
    );
}

