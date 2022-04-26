import axios from 'axios';
import React, { useState } from "react";

export default function Register({url}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
    
    function registerUser(e) {
        e.preventDefault();

        if(password !== passwordCheck) {
          return alert("Salasanat eivät täsmää!");
        } else {
          const json = JSON.stringify({
            ktunnus: username,
            sposti: email,
            salasana: password
          });
          axios.post(url + "admin/add_user.php", json, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Methods": "POST"
            }
          })
            .then((response) => {
              
            }).catch(error => {
              alert(error.response === undefined ? error : error.response.data.error);
            })
        }
    }

    return (
        <main className="container">
          <form className="mt-5" onSubmit={registerUser}>
            <h3>Rekisteröidy</h3>
            <div className="mb-3">
              <label htmlFor="ktunnus" className="form-label">Käyttäjätunnus</label>
              <input type="text" id="ktunnus" className="form-control" onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="sposti" className="form-label">Sähköposti</label>
              <input type="text" id="sposti" className="form-control" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="salasana" className="form-label">Salasana</label>
              <input type="password" id="salasana" className="form-control" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="passwordCheck" className="form-label">Salasana uudelleen</label>
              <input type="password" id='passwordCheck' className="form-control" onChange={e => setPasswordCheck(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-dark">Lähetä tilaus</button>
          </form>
        </main>
    );
}
