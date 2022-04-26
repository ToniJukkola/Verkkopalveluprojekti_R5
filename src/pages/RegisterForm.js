import axios from 'axios';
import React, { useState } from "react";

export default function Register({url}) {
  const [password, setPassword] = useState(-1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
    

    function handleZip() {
      axios.get(url + "order/zipcodes.php/" + zip)
        .then((response) => {
          console.log(response.data);
          setCity(response.data["toimipaikka"])
        }).catch(error => {
          alert(error.response === undefined ? error : error.response.data.error);
        })
    }
    
    function registerUser(e) {
        e.preventDefault();

        if(password !== passwordCheck) {
          return alert("Salasanat eivät täsmää!");
        } else {

          const json = JSON.stringify({
            etunimi: firstname,
            sukunimi: lastname,
            sposti: email,
            password: password,
            osoite: address,
            postinro: zip,
            postitmp: city,
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
            <h3>Toimitustiedot</h3>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Etunimi</label>
              <input type="text" name="firstname" className="form-control" onChange={e => setFirstname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Sukunimi</label>
              <input type="text" name="lastname" className="form-control" onChange={e => setLastname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Sähköposti</label>
              <input type="text" name="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="address" className="form-label">Salasana</label>
              <input type="password" name="email" className="form-control" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="address" className="form-label">Salasana uudelleen</label>
              <input type="password" name="email" className="form-control" onChange={e => setPasswordCheck(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Katuosoite</label>
              <input type="text" name="address" className="form-control" onChange={e => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">Postinumero</label>
              <input type="text" name="zip"  className="form-control" onChange={e => setZip(e.target.value)} onBlur={handleZip} required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">Postitoimipaikka</label>
              <input type="text" name="city" value={city} className="form-control" onChange={e => setCity(e.target.value)} required disabled />
            </div>
            <button type="submit" className="btn btn-dark">Lähetä tilaus</button>
          </form>
        </main>
    );
}
