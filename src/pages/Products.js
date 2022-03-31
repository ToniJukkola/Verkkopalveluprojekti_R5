import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Products({ url }) {
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);

  let params = useParams();

  useEffect(() => {
    axios.get(url + "products/get_products.php/" + params.categoryID)
      .then((response) => {
        setCategoryName(response.data.category);
        setProducts(response.data.products);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [params])


  return (
    
    <main className="container">
    <h1>{categoryName}</h1>
    <div className="product-list-wrapper">
      {/* TUOTEKORTTIEN MAPPAUS ALKAA */}
      {products?.map(product => (
        <div className="card" key={product.tuotenro}>
          <img src={require(".././images/tuotenro_" + product.tuotenro + ".jpg")} className="card-img-top" alt="" />
          <div className="card-body">
            <div>
              <h5 className="card-title">{product.tuotenimi}</h5>
              <h6 className="card-title">{product.hinta}</h6>
            </div>
            <p className="card-text">{product.tuotekuvaus}
              <Link to={"/tuote/" + product.tuotenro}>Lue lisää</Link>
            </p>

            <a href="#" className="btn btn-accent"><i className="bi bi-bag-fill"></i> Lisää ostoskoriin</a>
          </div>
        </div>
      ))}
      {/* TUOTEKORTTIEN MAPPAUS PÄÄTTYY */}
    </div>
    </main>
  )
}
