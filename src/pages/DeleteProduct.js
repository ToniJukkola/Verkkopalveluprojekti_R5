import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function DeleteProduct({ url }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(url + "products/get_products-all.php")
            .then((response) => {
                setProducts(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, [])


    return (
    <main className="container">
        <h1>Tuotteiden poistaminen</h1>
            <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
            <br/><br/>
       <div className="mt-5 col-lg-6 col-sm">  
          <h4>Valitse tuotteet jotka haluat poistaa valikoimasta</h4>
            <ul className="list-group">
                {products?.map(product => (
                    <div key={product.tuotenro}>
                        <form>
                            <li className="list-group-item d-flex justify-content-between align-items-center">{product.tuotenro}{". "}{product.tuotenimi} <button className="btn btn-outline-danger p-1 m-2" role="button">Poista <i className="bi bi-trash3"></i></button></li>
                        </form>
                    </div>
                ))}
            </ul>
        </div>   
    </main>
    );
}