import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function Search({ url, addToCart }) {
    const [categoryName, setCategoryName] = useState("");
    const [products, setProducts] = useState([]);

    let params = useParams();

    useEffect(() => {
        axios.get(url + "products/get_products_by_criteria.php/" + params.searchTerm)
          .then((response) => {
            setProducts(response.data.products);
          }).catch(error => {
            alert(error.response === undefined ? error : error.response.data.error);
          })
    }, [params]);


    return (
        <>
        <h1>{'Hakusanalla: "' + params.searchTerm + '" löytyi ' + products.length + " tuotetta."}</h1>
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
      </>
    );
}
