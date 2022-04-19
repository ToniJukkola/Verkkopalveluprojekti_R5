import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function OrderSummary({ url }) {
  const [orderId, setOrderId] = useState("");
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState([])

  let params = useParams();

  useEffect(() => {
    axios.get(url + "order/summary_order.php/" + params.orderID)
      .then((response) => {
        setOrderId(response.data.order);
        setOrderedProducts(response.data.products);
        setTotal(response.data.total);
        setCustomer(response.data.customer);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url])

  return (
    <main className="container">
      <h1>Tilauksen #{orderId} yhteenveto</h1>

      <h2>Tilaamasi tuotteet</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Tuote</th>
            <th>Kpl</th>
            <th>Hinta à</th>
            <th>Yhteensä</th>
          </tr>
        </thead>
        <tbody>
          {/* Tuotteiden mappaus alkaa */}
          {orderedProducts.map(product => (
            <tr key={product.tuotenro}>
              <td>{product.tuotenimi}</td>
              <td>{product.kpl}</td>
              <td>{product.hinta} €</td>
              <td>{product.tuotesumma} €</td>
            </tr>
          ))}
          {/* Tuotteiden mappaus päättyy */}
          <tr>
            <th colSpan={3} className="text-end">Loppusumma</th>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>

      <h2>Toimitustiedot</h2>
      <ol className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Tilaajan nimi</div>
            {customer.etunimi} {customer.sukunimi}
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Toimitusosoite</div>
            {customer.osoite}<br/>
            {customer.postinro} {customer.postitmp}
          </div>
        </li>
      </ol>

    </main>
  )
}
