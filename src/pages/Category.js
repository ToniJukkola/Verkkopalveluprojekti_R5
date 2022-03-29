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
    if(params.trnro > 0){
      axios.get(URL + "get_products.php/" + params.trnro
    )
      .then((response) => {
        setProductList(response.data)
      }).catch(error => {
        alert(error);
      });}
    },[params]);

    return (
        <>

            <ul>
            {productList.products?.map(e => (
                <li key={e.tuotenro}> <Link to={"/tuote/" + e.tuotenro}> {e.tuotenimi} {e.tuotekuvaus}</Link> </li>
            ))}
            </ul>
        </>
    );
}