import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function AddProduct({ url }) {
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios.get(url + "products/get_categories.php")
            .then((response) => {
                setCategories(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, []);

    function addNewProduct(e) {
        e.preventDefault();
        // Tää koodi tulee sit Tonin tuotekoodin .then sisälle
        let data = new FormData();
        data.append('file', selectedFile[0]);
        console.log(data);
        
        axios.post(url + "admin/save_img.php", data)
        .then((response) => {
            console.log(response);
        }).catch(error => {
            alert(error.response ? error.response.data.error : error);
        });
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files);
        console.log(event.target.files);
    }

    return (
        <main className="container">
            <h1>Tuotteiden lisääminen</h1>
            <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
            <form onSubmit={addNewProduct}>
            <ul><br></br>
                <h4>Uusi tuote:</h4>
            </ul>
            <div className="mt-5 col-lg-6 col-sm">
            <ul>
                <textarea className="form-control" placeholder="Nimi"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Kuvaus"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Hoito-ohje"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Tieteellinen nimi"></textarea>
            </ul>
            <ul>
                <input className="form-control" type="number" step="0.01" placeholder="Hinta"></input>
            </ul>
            <ul>
                <select className='form-control'>
                    {categories?.map(category => (
                        <option key={category.trnro}>{category.trnimi}
                        </option>))};
                </select>
            </ul>
            <ul>
                <input type="file" className='form-control' name='upload_file' onChange={handleFileSelect} />
            </ul>
            <ul>
                <button type="submit" className="btn btn-outline-dark">Lisää uusi tuote</button>
            </ul>
           </div>
           </form> 
        </main>
    );
}