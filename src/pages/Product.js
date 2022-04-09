import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Product.css'

export default function Product({ url, addToCart }) {
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
    <div className='grid_container'>
      <div>
      <h4>{product.hinta}</h4>
      <button className="btn btn-accent" role="button" onClick={e => addToCart(product)}><i className="bi bi-bag-fill"></i> Lisää ostoskoriin</button>
      <label htmlFor="amount" className='amount'>KPL</label>
      <select name="amount" id="amount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    <img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt={product.tuotenimi} className="img-thumbnail" />
    </div>
    <div>
    <h3 className='product_name'>{product.tuotenimi}</h3>
    <p className='scientific_name'>{product.tieteellinen_nimi}</p>
    <h4>{product.hinta}</h4>
    <div className='circle'>
    <p className='product_disc'>{product.tuotekuvaus}</p>
    <p className='product_care'>{product.ohje}</p>
    </div>
    </div>
    </div>
    </>
  )
}
