import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Orderlist({ url }) {
  const [orders, setOrders] = useState([]);

  // Haetaan tilaukset backendistä
  useEffect(() => {
    axios.get(url + "admin/get_orders.php")
      .then((response) => {
        setOrders(response.data);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url])

  return (
    <>
      <h2>Asiakkaiden tekemät tilaukset</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Asiakas</th>
            <th>Tilattu</th>
            <th className="text-end">Tuotteet</th>
          </tr>
        </thead>
        <tbody>
          {/* Tilausten mappaus alkaa */}
          {orders.map(order => (
            <tr key={order.tilausnro}>
              <td>{order.tilausnro}</td>
              <td>{order.asiakastiedot.etunimi} {order.asiakastiedot.sukunimi} (asnro: #{order.asiakas_id})</td>
              <td>{order.tilausaika}</td>
              <td className="text-end">
                <ul className="list-unstyled">
                {order.tuotteet.map(tuote => (
                <li key={tuote.tuotenro}>{tuote.tuotenimi} x {tuote.kpl}</li>
              ))}
              </ul>
              </td>
            </tr>
          ))}
          {/* Tilausten mappaus päättyy */}
        </tbody>
      </table>
    </>
  )
}
