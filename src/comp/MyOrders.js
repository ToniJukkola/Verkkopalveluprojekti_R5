import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyOrders({ url, token }) {
  const [orders, setOrders] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);

  // Haetaan tilaukset
  useEffect(() => {
    axios.get(url + "users/get_own-orders.php/" + token)
      .then((response) => {
        if (typeof response.data == "object") {
          setOrders(response.data);
          setHasOrders(true);
        }
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url, token])

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Tilausnro</th>
          <th>Tilattu</th>
          <th>Tuotteet</th>
          <th>Loppusumma</th>
        </tr>
      </thead>
      <tbody>
        {hasOrders ? orders.map(order => (
          <tr key={order.tilausnro}>
            <td>{order.tilausnro}</td>
            <td>{order.tilausaika}</td>
            <td>
              <ul className="list-unstyled">
                {order.tuotteet.map(tuote => (
                  <li key={tuote.tuotenro}>{tuote.tuotenimi} x {tuote.kpl}</li>
                ))}
              </ul>
            </td>
            <td>{order.loppusumma}</td>
          </tr>
        )) : null}
      </tbody>
    </table>
  )
}
