import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'

export default function Order({ cart }) {
  let sum = 0;

  return (
    <main className="container">
      <h3>Ostoskorin tuotteet</h3>
      <table>
        <tbody>
          {cart.map(product => {
            sum += parseFloat(product.hinta);
            return (
              <tr key={uuid()}>
                <td>{product.tuotenimi}</td>
                <td>{product.hinta}</td>
              </tr>
            )
          })}
          <tr key={uuid} style={{borderTop: 1 + "px solid"}}>
            <td>Yhteensä</td>
            <td>{sum.toFixed(2)} €</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
