import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function GetProduct({ url }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(url + "products/get_products-all.php")
            .then((response) => {
                setProducts(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, [url])

    function DeleteProduct(tuotenro) {
        const json = JSON.stringify({ tuotenro: tuotenro });
        axios.post(url + "admin/delete_product.php", json, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          
          .catch(error => {
            alert(error.response ? error.response.data.error : error);
          });
      }


    return (
    <main className="container">
        <h1>Tuotteiden hallinta</h1>
            <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
            <br/><br/>
       <div className="mt-5 col-lg-6 col-sm">  
          <h4>Valitse tuotteet joita haluat muokata</h4>
            <ul className="list-group">
                {products?.map(product => (
                    <div key={product.tuotenro}>
                        <form>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="col-md-8">{product.tuotenro}{". "}{product.tuotenimi} </div>
                            <div><Link  to={"/Admin/EditProduct/" + product.tuotenro} className="btn btn-outline-dark p-1 m-2" role="button">Muokkaa</Link></div>
                            <div className="col-md-2"><button className="btn btn-outline-danger p-1 m-2 " role="button" onClick={() => DeleteProduct(product.tuotenro)}>Poista <i className="bi bi-trash3"></i></button></div></li>
                        </form>
                    </div>
                ))}
            </ul>
        </div>   
    </main>
    );
}