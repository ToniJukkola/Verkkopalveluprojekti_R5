import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Product({ url }) {
  const [product, setProduct] = useState([]);

  let params = useParams();

  useEffect(() => {
    axios.get(url + "products/get_product.php/" + params.productID)
      .then((response) => {
        setProduct(response.data[0]);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [params])

  return (
    <>
    <h3>{product.tuotenimi}</h3>
    <h3>{product.tieteellinen_nimi}</h3>
    {/* Kuva tähän jee */}
    <h4>{product.hinta}</h4>
    <p>{product.tuotekuvaus}</p>
    <p>{product.ohje}</p>
    </>
  )
}
