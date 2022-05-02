import React from 'react'
import MyOrders from '../comp/MyOrders'
import MyInfo from '../comp/MyInfo'

export default function Profile({ url, token }) {
  return (
    <>
      <h1>Oma profiili</h1>
      <h2>Yhteystiedot</h2>
      <MyInfo url={url} token={token} />
      <h2 className="mt-5">Oma tilaushistoria</h2>
      <MyOrders url={url} token={token} />
    </>
  )
}
