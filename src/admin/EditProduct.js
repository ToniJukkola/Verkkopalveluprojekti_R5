import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ShowProduct({ url }) {
    const [product, setProduct] = useState([]);
    const [tuotenimi, setTuotenimi] = useState([]);
    const [hinta, setHinta] = useState([]);
    const [tieteellinen_nimi, setTieteellinen_nimi] = useState([]);
    const [tuotekuvaus, setTuotekuvaus] = useState([]);
    const [ohje, setOhje] = useState([]);

    let params = useParams();

    useEffect(() => {
        axios.get(url + "products/get_product.php/" + params.productID)
            .then((response) => {
                setTuotenimi(response.data[0].tuotenimi)
                setHinta(response.data[0].hinta)
                setTieteellinen_nimi(response.data[0].tieteellinen_nimi)
                setTuotekuvaus(response.data[0].tuotekuvaus)
                setOhje(response.data[0].ohje)
                console.log(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, [params])

    function EditProduct(tuotenro) {
        const json = JSON.stringify({ tuotenro: tuotenro });
        axios.post(url + "admin/edit_product.php", json, {
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
             <div>
                <input value={tuotenimi} onChange={e => setTuotenimi(e.target.value)} />
                <input value={hinta} onChange={e => setHinta(e.target.value)} />
                <input value={tieteellinen_nimi} onChange={e => setTieteellinen_nimi(e.target.value)} />
                <input value={tuotekuvaus} onChange={e => setTuotekuvaus(e.target.value)} />
                <input value={ohje} onChange={e => setOhje(e.target.value)} />
                <img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + product?.tuotenro + ".jpg"} alt={product.tuotenimi} />
            </div>
        </main>
      );

}