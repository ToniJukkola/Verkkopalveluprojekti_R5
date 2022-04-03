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

            <br /><br />
            <form>
                <ul><h4>Valitse tuotteet jotka haluat poistaa valikoimasta</h4></ul>
            </form>
            <div>
                {products?.map(product => (
                    <div key={product.tuotenro}>
                        <form>
                            <ul>{product.tuotenro}{". "}{product.tuotenimi}{" "}<input type={"checkbox"}></input></ul>
                        </form>
                    </div>
                ))}
            </div>
            <ul>
                <button type="button" className="btn btn-outline-dark">Poista tuote</button>
            </ul>
        </main>
    );
}