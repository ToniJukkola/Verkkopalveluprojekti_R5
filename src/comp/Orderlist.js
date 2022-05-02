import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Orderlist({ url }) {
  const [notProcessedOrders, setNotProcessedOrders] = useState([]);
  const [processedOrders, setProcessedOrders] = useState([]);
  const [changes, setChanges] = useState(0); // laskuri, jonka muutoksista useEffect riippuu

  // Haetaan tilaukset backendistä
  useEffect(() => {
    axios.get(url + "admin/get_orders.php")
      .then((response) => {
        let notProcessed = response.data.filter(order => order.kasitelty === 0);
        let processed = response.data.filter(order => order.kasitelty === 1);
        setProcessedOrders(processed);
        setNotProcessedOrders(notProcessed);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url, changes])

  function handleChange(e) {
    axios.post(url + "/admin/process_orders.php?status=" + (e.target.checked ? 1: 0) + "&tilausnro=" + e.target.value, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Methods": "POST"
      }
    })
      .then(() => {
        setChanges(changes + 1); // lisää laskuriin yhden > useEffect ajetaan uusiksi
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
    
  }

  return (
    <>
      <h3 className="mt-5">Käsittelemättömät tilaukset</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Asiakas</th>
            <th>Tilattu</th>
            <th>Tuotteet</th>
            <th className="text-end">Käsitelty?</th>
          </tr>
        </thead>
        <tbody>
          {/* Tilausten mappaus alkaa */}
          {notProcessedOrders.map(order => (
            <tr key={order.tilausnro}>
              <td>{order.tilausnro}</td>
              <td>{order.asiakastiedot.etunimi} {order.asiakastiedot.sukunimi} (asnro: #{order.asiakas_id})</td>
              <td>{order.tilausaika}</td>
              <td>
                <ul className="list-unstyled" style={{border: "1px solid #ddd", borderBottom: "0", maxWidth: "300px"}}>
                {order.tuotteet.map(tuote => (
                <li style={{gap: "1em", padding: ".25em", display: "grid", gridTemplateColumns: ".25fr 1fr auto", borderBottom: "1px solid #ddd"}} key={tuote.tuotenro}><span>#{tuote.tuotenro}</span> <span>{tuote.tuotenimi}</span> <span>x {tuote.kpl}</span></li>
              ))}
              </ul>
              </td>
              <td className="text-end">
                {order.kasitelty == 0 ? <input type="checkbox" value={order.tilausnro} onChange={handleChange} /> : <input type="checkbox" value={order.tilausnro} onChange={handleChange} defaultChecked />}
                </td>
            </tr>
          ))}
          {/* Tilausten mappaus päättyy */}
          
        </tbody>
      </table>
      <h3 className="mt-5">Käsitellyt tilaukset</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Asiakas</th>
            <th>Tilattu</th>
            <th>Käsitelty</th>
            <th>Tuotteet</th>
            <th className="text-end">Käsitelty?</th>
          </tr>
        </thead>
        <tbody>
          {/* Tilausten mappaus alkaa */}
          {processedOrders.map(order => (
            <tr key={order.tilausnro}>
              <td>{order.tilausnro}</td>
              <td>{order.asiakastiedot.etunimi} {order.asiakastiedot.sukunimi} (asnro: #{order.asiakas_id})</td>
              <td>{order.tilausaika}</td>
              <td>{order.kasittelyaika}</td>
              <td>
                <ul className="list-unstyled">
                {order.tuotteet.map(tuote => (
                <li key={tuote.tuotenro}>#{tuote.tuotenro} {tuote.tuotenimi} x {tuote.kpl}</li>
              ))}
              </ul>
              </td>
              <td className="text-end">
                {order.kasitelty == 0 ? <input type="checkbox" value={order.tilausnro} onChange={handleChange} /> : <input type="checkbox" value={order.tilausnro} onChange={handleChange} defaultChecked />}
                </td>
            </tr>
          ))}
          {/* Tilausten mappaus päättyy */}
          
        </tbody>
      </table>
    </>
  )
}
