import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Product.css'

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
<<<<<<< HEAD
    <h3 className='product_name'>{product.tuotenimi}</h3>
    <p className='scientific_name'>{product.tieteellinen_nimi}</p>
    {/* <img src={require(".././images/tuotenro_" + product.tuotenro + ".jpg")}/> */}
    <h4>{product.hinta}</h4>
    <div>
       <button type="button" className='cart_button'>Lisää ostoskoriin</button>
       <label for="amount">KPL</label>
                                <select name="amount" id="amount">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
        </div>
    <div className='circle'>
    <p className='product_disc'>{product.tuotekuvaus}</p>
    <p className='product_care'>{product.ohje}</p>
=======
    <div>
      <h3>{product.tuotenimi}</h3>
      <h3>{product.tieteellinen_nimi}</h3>
      <img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt={product.tuotenimi} className="img-thumbnail" />
      <h4>{product.hinta}</h4>
      <p>{product.tuotekuvaus}</p>
      <p>{product.ohje}</p>
>>>>>>> 1ef37fd6ca4bbb669c1a5855d824abbdae4ece28
    </div>
    </>
  )
}
