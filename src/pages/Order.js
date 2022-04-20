import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import OrderSummary from '../comp/OrderSummary';

export default function Order({ url, cart, removeFromCart, updateAmount, emptyCart }) {
  const [inputs] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [orderID, setOrderID] = useState("")

  let sum = 0;

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      inputs[i] = createRef();
    }
  }, [cart.length, inputs])

  useEffect(() => {
    if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
      inputs[inputIndex].current.focus();
    }
  }, [cart, inputIndex, inputs])

  function changeAmount(e, product, index) {
    updateAmount(e.target.value, product);
    setInputIndex(index);
  }

  function sendOrder(e) {
    e.preventDefault();

    const json = JSON.stringify({
      etunimi: firstname,
      sukunimi: lastname,
      sposti: email,
      osoite: address,
      postinro: zip,
      postitmp: city,
      ostoskori: cart
    });
    axios.post(url + "order/save_order.php", json, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Methods": "POST"
      }
    })
      .then((response) => {
        if (validateForm()) {
          emptyCart();
          setOrderID(response.data.order_id);
          setIsFinished(true);
        }
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }

  function validateForm() {
    // Tarkistetaan onko ostoskori tyhjä
    if (cart.length <= 0) {
      setError("Ostoskori on tyhjä.");
      return false;
    }

    // Tarkistetaan onko kenttiä tyhjänä
    if (firstname === "" || lastname === "" || address === "" || zip === "" || city === "") {
      setError("Kaikkien kenttien tulee olla täytetty.");
      return false;
    }

    // Tarkistetaan onko postinumero 5 merkkiä ja sisältää vain numeroita
    if (zip.length !== 5) {
      setError("Postinumeron on oltava tasan viisi merkkiä pitkä.");
      return false;
    }

    const digits = "0123456789";
    let zipCheck = 0;
    for (let i = 0; i < zip.length; i++) {
      if (digits.includes(zip.charAt(i))) {
        zipCheck++
      }
    }

    if (zipCheck < zip.length) {
      setError("Postinumero voi sisältää vain numeroita.")
      return false;
    }

    setError("");
    return true;
  }

  if (isFinished === false) {
    return (
      <main className="container">
        <h3>Ostoskorin tuotteet</h3>
        <table>
          <tbody>
            {cart.map((product, index) => {
              sum += parseFloat(product.hinta * product.amount);
              return (
                <tr key={uuid()}>
                  <td>{product.tuotenimi}</td>
                  <td>{product.hinta} €</td>
                  <td><input style={{ width: 100 + "px", padding: 5 + "px" }} ref={inputs[index]} type="number" min="1" value={product.amount} onChange={e => changeAmount(e, product)} ></input></td>
                  <td><button className="btn btn-dark" onClick={() => removeFromCart(product)}>Poista</button></td>
                </tr>
              )
            })}
            <tr key={uuid} style={{ borderTop: 1 + "px solid" }}>
              <td>Yhteensä</td>
              <td>{sum.toFixed(2)} €</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>

        <button className="mt-4 btn btn-outline-dark" onClick={emptyCart}>Tyhjennä ostoskori</button>

        <form className="mt-5" onSubmit={sendOrder}>
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
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Katuosoite</label>
            <input type="text" name="address" className="form-control" onChange={e => setAddress(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">Postinumero</label>
            <input type="text" name="zip" className="form-control" onChange={e => setZip(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">Postitoimipaikka</label>
            <input type="text" name="city" className="form-control" onChange={e => setCity(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-dark">Lähetä tilaus</button>
        </form>

        {error === "" ? "" :
          <div className="alert alert-danger mt-3">{error}</div>
        }
      </main>
    )
  } else {
    return (
    <main className="container">
      <OrderSummary url={url} order={orderID} />
    </main>
    )
  }
}
