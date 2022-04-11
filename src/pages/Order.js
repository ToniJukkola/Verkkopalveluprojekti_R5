import React, { createRef, useEffect, useState } from 'react'
import uuid from 'react-uuid'

export default function Order({ cart, removeFromCart, updateAmount }) {
  const [inputs, _] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);

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
    </main>
  )
}
