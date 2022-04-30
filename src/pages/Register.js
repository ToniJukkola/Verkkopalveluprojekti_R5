import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register({ url }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerResponse, setRegisterResponse] = useState([]);

  function register(e) {
    e.preventDefault();

    if (validateForm()) {
      const json = JSON.stringify({
        etunimi: firstname,
        sukunimi: lastname,
        email: email,
        salasana: password
      });
      axios.post(url + "users/register.php", json, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Methods": "POST"
        }
      })
        .then((response) => {
          setRegisterResponse(response.data);
        }).catch(error => {
          alert(error.response === undefined ? error : error.response.data.error);
        })
    }
  }

  function validateForm() {
    // Tarkistetaan onko kenttiä tyhjänä
    if (firstname === "" || lastname === "" || email === "" || password === "" || passwordConfirm === "") {
      setError("Kaikkien kenttien tulee olla täytetty.");
      return false;
    }

    // Tarkistetaan sisältääkö sähköposti @
    if (!email.includes("@")) {
      setError("Virheellinen sähköpostiosoite.");
      return false;
    }

    // Tarkistetaan vastaavatko salasanat toisiaan
    if (password !== passwordConfirm) {
      setError("Salasanat eivät täsmää.");
      return false;
    }

    setError("");
    setIsSuccess(true);
    return true;
  }
  if (isSuccess === false) {
    return (
      <main className="container">
        <div className="login-container">
          <h1>Rekisteröidy käyttäjäksi</h1>
          <form className="mt-5" onSubmit={register}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Etunimi</label>
              <input type="text" name="firstname" id="firstname" className="form-control" onChange={e => setFirstname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Sukunimi</label>
              <input type="text" name="lastname" id="lastname" className="form-control" onChange={e => setLastname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Sähköposti</label>
              <input type="text" name="email" id="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Salasana</label>
              <input type="password" name="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password-confirm" className="form-label">Varmista salasana</label>
              <input type="password" name="password-confirm" id="password-confirm" className="form-control" onChange={e => setPasswordConfirm(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-accent">Rekisteröidy</button>
          </form>

          {error === "" ? "" :
            <div className="alert alert-danger mt-3">{error}</div>
          }
        </div>
      </main>
    )
  } else {
    return (
      <main className="container">
        <h2>Rekisteröityminen onnistui!</h2>
        <div className="alert alert-success mt-3">
          <p>Tervetuloa <strong>{registerResponse.etunimi}</strong>! Olet rekisteröitynyt onnistuneesti.</p>
          <p>Käyttäjätunnuksesi on <strong>{registerResponse.tunnus}</strong></p>
          <p>Asiakasnumerosi on <strong>{registerResponse.asiakasnro}</strong></p>
          <p>Haluatko <Link to={"/kirjaudu"}>kirjautua sisään</Link>?</p>
        </div>
      </main>
    )
  }
}
