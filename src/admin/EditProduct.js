import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ShowProduct({ url }) {
    const [tuotenimi, setTuotenimi] = useState([]);
    const [hinta, setHinta] = useState([]);
    const [tieteellinen_nimi, setTieteellinen_nimi] = useState([]);
    const [tuotekuvaus, setTuotekuvaus] = useState([]);
    const [ohje, setOhje] = useState([]);
    const [category, setCategory] = useState(1);
    const [categories, setCategories] = useState([]);
    const [trnro, setTrnro] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    let params = useParams();

    useEffect(() => {
        axios.get(url + "products/get_product.php/" + params.productID)
            .then((response) => {
                setTuotenimi(response.data[0].tuotenimi)
                setHinta(response.data[0].hinta)
                setTieteellinen_nimi(response.data[0].tieteellinen_nimi)
                setTuotekuvaus(response.data[0].tuotekuvaus)
                setOhje(response.data[0].ohje)
                setTrnro(response.data[0].trnro);
                console.log(response.data);
                axios.get(url + "products/get_categories.php")
            .then((response) => {
              if (response.data.trnro == trnro) {
                setCategory(response.data);
              }
              setCategories(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, [params])

    function EditProduct() {
      const json = JSON.stringify({ 
          tuotenro: params.productID,
          tuotenimi: tuotenimi,
          tuotekuvaus: tuotekuvaus,
          hinta: hinta, 
          tieteellinen_nimi: tieteellinen_nimi,
          ohje: ohje,
          trnro: category
        });
        axios.post(url + "admin/edit_product.php", json, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          // Lisätään kuva backendiin, kun tiedot on lisätty
          if(selectedFile !== null) {
            let data = new FormData();
            data.append('file', selectedFile[0]);
            data.append("tuotenro", params.productID)
            axios.post(url + "admin/save_img.php", data)
            .catch(error => {
                alert(error.response ? error.response.data.error : error);
            });
          }
          })
          .catch(error => {
            alert(error.response ? error.response.data.error : error);
          });
        }

    const handleFileSelect = (event) => {
          setSelectedFile(event.target.files);
    }
      
      return (
        <main className="container">
             
             <h1>Tietojen muokkaaminen</h1>
             <Link className="p-3" to={"/admin/edit"}>&larr; Takaisin tuotteiden hallintaan</Link>
             <form onSubmit={EditProduct}>
             <div className="mt-5 col-lg-6 col-sm">
               
                <ul><input className="form-control" value={tuotenimi} onChange={e => setTuotenimi(e.target.value)} /></ul>
                <ul><input className="form-control" type="number" step="0.01" value={hinta} onChange={e => setHinta(e.target.value)} /></ul>
                <ul><input className="form-control" value={tieteellinen_nimi} onChange={e => setTieteellinen_nimi(e.target.value)} /></ul>
                <ul><input className="form-control" value={tuotekuvaus} onChange={e => setTuotekuvaus(e.target.value)} /></ul>
                <ul><input className="form-control" value={ohje} onChange={e => setOhje(e.target.value)} /></ul>
                <ul><select className='form-control' value={category} onChange={e => setCategory(e.target.value)}>
                            {categories?.map(category => (
                                <option key={category.trnro}value={category.trnro}>{category.trnimi}
                                </option>))};
                    </select>
                </ul>
                
              <ul><input type="file" className='form-control' name='upload_file' onChange={handleFileSelect} /></ul>
              <ul><img src={"http://localhost/verkkopalveluprojekti_r5_backend/images/tuotenro_" + params.productID + ".jpg"} alt={tuotenimi} /></ul>
              
              <ul><button type="submit" className="btn btn-outline-dark">Päivitä</button></ul>
            </div>
            </form>
            
        </main>
      );

}