import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Products({ url, addToCart }) {
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios.get(url + "products/get_products.php/" + params.categoryID)
      .then((response) => {
        setCategoryName(response.data.category);
        setProducts(response.data.products);
        setIsLoading(false);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [url, params.categoryID])

  if (isLoading) {
    return (
      <main className="container"><h3 className="display-3 text-center">Ladataan... tuotteita</h3></main>
    )
  } else {

    return (

      <main className="container">
        <h1>{categoryName}</h1>
        <div className="product-list-wrapper">
          {/* TUOTEKORTTIEN MAPPAUS ALKAA */}
          {products?.map(product => (
            <div className="card" key={product.tuotenro}>
              <img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} className="card-img-top" alt="" />
              <div className="card-body">
                <div>
                  <h5 className="card-title">{product.tuotenimi}</h5>
                  <h6 className="card-title">{product.hinta}</h6>
                </div>
                <p className="card-text">{product.tuotekuvaus}
                  <Link to={"/tuotteet/" + product.trnro + "/tuote/" + product.tuotenro}>Lue lisää</Link>
                </p>

                <button className="btn btn-accent" onClick={e => addToCart(product)}><i className="bi bi-bag-fill"></i> Lisää ostoskoriin</button>
              </div>
            </div>
          ))}
          {/* TUOTEKORTTIEN MAPPAUS PÄÄTTYY */}
        </div>
      </main>
    )
  }
}