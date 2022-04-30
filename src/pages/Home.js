import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
            <section className="welcome-section">
                <img className="deco-img" src="http://localhost/verkkopalveluprojekti_r5_backend/images/vihervajakesken.jpg" alt="Koristekuva nainen kasvien keskellä" />
                <div>
                    <h3>Tervetuloa huonekasvien verkkokauppa Vihervajaan!</h3>
                    <p className="mt-4">Vihervaja Oy on vuonna 2022 perustettu verkkokauppa viherpeukaloille ja vihreistä peukaloista haaveileville.</p>
                    <p className="mt-4">Valikoimastamme löydät niin helppohoitoiset huonekasvit aloittelijalle kuin vaativammat kasvikaverit kokeneemmille konkareillekin, ruukkuja, aluslautasia ja muita oheistarvikkeita unohtamatta.</p>
                    <p className="lead mt-4">Älä ole vihervajaa – tilaa oma kasvikaverisi heti tänään!</p>
                </div>
            </section>
        </>
    );
}
