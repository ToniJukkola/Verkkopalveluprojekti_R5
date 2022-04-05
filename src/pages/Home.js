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
                <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {products?.map((product, index) => 

                        index === 0 ? (
                            <div className="carousel-item active" key={index}>
                            <img className="d-block w-100" src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt={product.tuotenimi} />
                            </div>
                        ) : (
                            <div className="carousel-item" key={index}>
                            <img className="d-block w-100" src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product.tuotenro + ".jpg"} alt={product.tuotenimi} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
