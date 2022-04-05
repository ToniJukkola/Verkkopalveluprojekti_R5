import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Hero from "../comp/Hero";

export default function Home({ url }) {
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
        <>
            <Hero />

            <main className="container">
                <div id="carouselControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {products?.map((product, index) => 
                            <div className="carousel-item" key={index}>
                            <img className="d-block w-100" src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt="First slide" />
                            </div>
                        )}
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </main>
        </>
    );
}
