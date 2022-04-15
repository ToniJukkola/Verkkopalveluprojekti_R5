import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'
import uuid from 'react-uuid'

export default function Order({ url, cart, removeFromCart, updateAmount, emptyCart }) {
  const [inputs, _] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  let sum = 0;

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      inputs[i] = createRef();
    }
  }, [cart.length])

  useEffect(() => {
    if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
      inputs[inputIndex].current.focus();
    }
  }, [cart])

  function changeAmount(e, product, index) {
    updateAmount(e.target.value, product);
    setInputIndex(index);
  }

  function sendOrder(e) {
    e.preventDefault();

    const json = JSON.stringify({
      etunimi: firstname,
      sukunimi: lastname,
      osoite: address,
      postinro: zip,
      postitmp: city,
      ostoskori: cart
    });
    axios.post(url + "order/save_order.php",json,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      emptyCart();
      setIsFinished(true);
    }).catch(error => {
      alert(error.response === undefined ? error: error.response.data.error);
    })
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

      <form className="mt-5" onSubmit={sendOrder}>
        <h3>Toimitustiedot</h3>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">Etunimi</label>
          <input type="text" name="firstname" className="form-control" onChange={e => setFirstname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Sukunimi</label>
          <input type="text" name="lastname" className="form-control" onChange={e => setLastname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Katuosoite</label>
          <input type="text" name="address" className="form-control" onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">Postinumero</label>
          <input type="text" name="zip" className="form-control" onChange={e => setZip(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">Postitoimipaikka</label>
          <input type="text" name="city" className="form-control" onChange={e => setCity(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-accent">Lähetä tilaus</button>
      </form>

    </main>
  )
} else {
  return (
    <main className="container">
      <h4>Kiitos tilauksestasi!</h4>
    </main>
  )
}
}
