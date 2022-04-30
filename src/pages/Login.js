import axios from 'axios';
import React, { useState } from 'react'

export default function Login({ url, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [method, setMethod] = useState("with-email");
  const [loginResponse, setLoginResponse] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (validateForm()) {
      const json = JSON.stringify({
        tunnus: username,
        email: email,
        salasana: password
      });

      let loginUrl = "";
      if (method === "with-username") {
        loginUrl = "users/login-username.php";
      } else {
        loginUrl = "users/login-email.php";
      }
      axios.post(url + loginUrl, json, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Methods": "POST"
        }
      })
        .then((response) => {
          if (handleResponse(response.data)) {
            setLoginResponse(response.data);
            if (response.data.tunnus === username) {
              login(response.data.tunnus);
            }
            if (response.data.sposti === email) {
              login(response.data.tunnus);
            }
          }

        }).catch(error => {
          alert(error.response === undefined ? error : error.response.data.error);
        })
    }
  }

  /**
   * Käsittelee kirjautumistavan valinnan ja näyttää kerrallaan vain joko käyttäjätunnuksen tai sähköpostin inputin
   */
  function handleChoice(e) {
    setMethod(e.target.value);
    setEmail("");
    setUsername("");
  }

  function validateForm() {
    // Tarkistetaan onko kenttiä tyhjänä
    if ((method === "with-username" && (username === "" || password === "")) || (method === "with-email" && (email === "" || password === ""))) {
      setError("Kaikkien kenttien tulee olla täytetty.");
      return false;
    }

    setError("");
    return true;
  }

  /**
   * Käsittelee backendiltä saadun vastauksen ja jakelee erroreita tai päästää kirjautumisen läpi
   */
  function handleResponse(response) {
    // Jos vastaus on olio (eli käyttäjätunnus) => kirjautuminen onnistunut
    if (typeof (response) == "object") {
      setIsSuccess(true);
      return true;
    } else { // Jos ei, käydään läpi errorit
      if (response.includes("Käyttäjää ei löytynyt")) {
        setError("Käyttäjää ei löytynyt");
        return false;
      }
      if (response.includes("Väärä salasana")) {
        setError("Väärä salasana");
        return false;
      }
      if (response.includes("Väärä sähköpostiosoite")) {
        setError("Väärä sähköpostiosoite");
        return false;
      }
      if (response.includes("Väärä käyttäjätunnus")) {
        setError("Väärä käyttäjätunnus");
        return false;
      }
    }
    setError("");
    setIsSuccess(true);
    return true;
  }


  if (isSuccess === false) {
    return (
      <main className="container">
        <div className="login-container">
          <h1>Kirjaudu sisään</h1>
          <div className="mt-5" onChange={handleChoice}>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="login-method" id="with-email" value="with-email" defaultChecked />
              <label className="form-check-label" htmlFor="with-email">
                Sähköpostilla
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="login-method" id="with-username" value="with-username" />
              <label className="form-check-label" htmlFor="with-username">
                Käyttäjätunnuksella
              </label>
            </div>
          </div>
          <form className="mt-5" onSubmit={handleLogin}>
            {method === "with-email" ?
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Sähköposti</label>
                <input type="text" name="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
              </div>
              :
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Käyttäjätunnus</label>
                <input type="text" name="username" className="form-control" onChange={e => setUsername(e.target.value)} required />
              </div>
            }

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Salasana</label>
              <input type="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-accent">Kirjaudu sisään</button>
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
        <div className="login-container">
          <h2>Kirjautuminen onnistui!</h2>
          <div className="alert alert-success mt-3">
            Tervetuloa <strong>{loginResponse.tunnus}</strong>! Olet kirjautunut sisään onnistuneesti.
          </div>
        </div>
      </main>
    )
  }
}
