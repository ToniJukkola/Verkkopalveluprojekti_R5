import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyInfo({url, token}) {
  const [userData, setUserData] = useState([]);
  const [userBasics, setUserBasics] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMessage, setEditMessage] = useState(false);
  const [error, setError] = useState("");
  const [zipError, setZipError] = useState("");

  // Haetaan käyttäjätiedot backendistä
  useEffect(() => {
    axios.get(url + "users/get_own-info.php/" + token)
      .then((response) => {
        setUserData(response.data);
        setUserBasics(response.data);
        setEmail(response.data.sposti);
        setAddress(response.data.osoite);
        setZip(response.data.postinro);
        setCity(response.data.postitmp);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url, token])

  function handleZip() {
    axios.get(url + "order/zipcodes.php/" + zip)
      .then((response) => {
        if (response.data["toimipaikka"] === undefined) {
          setZipError("Virheellinen postinumero.");
          setCity("!! VIRHEELLINEN POSTINUMERO !!");
        } else {
          setZipError("");
          setCity(response.data["toimipaikka"]);
        }
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }

  function handleEditButton() {
    setEditMode(true);
    setEditMessage(false);
  }

  function validateForm() {
    // Tarkistetaan onko kenttiä tyhjänä
    if (email === "" || address === "" || zip === "" || city === "") {
      setError("Kaikkien kenttien tulee olla täytetty.");
      return false;
    }
    // Tarkistetaan sisältääkö sähköposti @
    if (!email.includes("@")) {
      setError("Virheellinen sähköpostiosoite.");
      return false;
    }
    // Tarkistetaan ettei postinumero ole virheellinen
    if (zipError) {
      setError(zipError);
      return false;
    }

    setError("");
    setZipError("");
    return true;
  }

  function submitChanges(e) {
    e.preventDefault();

    if (validateForm()) {

      const json = JSON.stringify({
        sposti: email,
        osoite: address,
        postinro: zip,
        postitmp: city
      });
      axios.post(url + "users/edit_own-info.php/" + token, json, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Methods": "POST"
        }
      })
        .then((response) => {
          setUserData(response.data);
        }).catch(error => {
          alert(error.response === undefined ? error : error.response.data.error);
        })
      setEditMode(false);
      setEditMessage(true);
    }
  }

  return (
    <>
    <div className="profile-info">
        <ol className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Etunimi</div>
              {userBasics.etunimi}
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sukunimi</div>
              {userBasics.sukunimi}
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Käyttäjätunnus</div>
              {userBasics.tunnus}
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Asiakasnro</div>
              {userBasics.asiakasnro}
            </div>
          </li>
          {editMode ? <p className="mt-3 alert alert-secondary">Jos haluat muuttaa nimitietojasi, ole yhteydessä asiakaspalveluun.</p> : ""}
        </ol>
        <form onSubmit={submitChanges}>
          <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Sähköposti</div>
                {userData.sposti}
                {editMode ? <input type="text" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} /> : ""}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Osoite</div>
                {userData.osoite}
                {editMode ? <input type="text" name="address" className="form-control" value={address} onChange={e => setAddress(e.target.value)} /> : ""}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Postinumero</div>
                {userData.postinro}
                {editMode ? <input type="text" name="zip" className="form-control" value={zip} onChange={e => setZip(e.target.value)} onBlur={handleZip} /> : ""}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Postitoimipaikka</div>
                {userData.postitmp}
                {editMode ? <input type="text" name="city" className="form-control" value={city} disabled /> : ""}
              </div>
            </li>
          </ol>
          {editMode ? <button type="submit" className="btn btn-accent mt-3" ><i className="bi bi-check2-square"></i> Hyväksy muutokset</button> : ""}
        </form>
      </div>
      {editMode ? "" : <button className="btn btn-accent mt-3" onClick={handleEditButton}><i className="bi bi-pencil-square"></i> Muokkaa osoitetietoja</button>}
      {editMessage ? <div className="mt-3 alert alert-warning"><h5>Tiedot muutettu onnistuneesti</h5></div> : ""}
      {error === "" ? "" :
        <div className="alert alert-danger mt-3">{error}</div>
      }
      </>
  )
}
