import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../comp/Globals";
import {
  Link,
  useParams
} from "react-router-dom";

export default function Category(props) {
  const [productList, setProductList] = useState([]);
  let params = useParams();

  useEffect(() => {
    console.log(params);
    if (params.trnro > 0) {
      axios.get(URL + "get_products.php/" + params.trnro
      )
        .then((response) => {
          setProductList(response.data)
        }).catch(error => {
          alert(error);
        });
    }
  }, [params]);

  return (
    <>
      <div className="product-list-wrapper">
        {/* TUOTEKORTTIEN MAPPAUS ALKAA */}
        {productList.products?.map(e => (
          <div className="card" key={e.tuotenro}>
            <img src={require(".././images/tuotenro_1.jpg")} className="card-img-top" alt="" />
            <div className="card-body">
              <div>
                <h5 className="card-title">{e.tuotenimi}</h5>
                <h6 className="card-title">{e.hinta}</h6>
              </div>
              <p className="card-text">{e.tuotekuvaus}
                <Link to={"/tuote/" + e.tuotenro}>Lue lisää</Link>
              </p>

              <a href="#" className="btn"><i className="bi bi-bag-fill"></i> Lisää ostoskoriin</a>
            </div>
          </div>
        ))}
        {/* TUOTEKORTTIEN MAPPAUS PÄÄTTYY */}
      </div>
    </>
  );
}