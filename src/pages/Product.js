import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    <h3 className='product_name'>{product.tuotenimi}</h3>
    <h4 className='price'>{product.hinta}</h4>
  
    <p className='scientific_name'>{product.tieteellinen_nimi}</p>
    <img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt={product.tuotenimi} className="img-thumbnail" />
  </div>
  <div>
      <button className="btn btn-accent" onClick={e => addToCart(product)}><i className="bi bi-bag-fill"></i> Lisää ostoskoriin</button>
      <label htmlFor="amount" className='amount'>KPL</label>
      <select name="amount" id="amount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      
    <div className='circle'>
    <p className='product_disc'>{product.tuotekuvaus}</p>
    <p className='product_care'>{product.ohje}</p>
    </div>
    </div>
    </div>
    </>
  )
}
