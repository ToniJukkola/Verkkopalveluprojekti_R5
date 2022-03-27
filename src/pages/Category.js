import axios from "axios";
import React, {useEffect, useState} from "react";
import { URL } from "../comp/Globals";

export default function Category(props) {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get(URL + "get_products.php?id=" + props.catCheck
        )
          .then((response) => {
            setProductList(response.data)
          }).catch(error => {
            alert(error);
          });
    }, []);

    return (
        <>

            <ul>
            {productList?.map(e => (
                <li key={e.tuotenro}>{e.tuotenimi} {e.tuotekuvaus}</li>
            ))}
            </ul>
        </>
    );
}