import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function AddProduct({ url }) {
    const [name, setName] = useState([]);
    const [desc, setDesc] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const [othername, setOthername] = useState([]);
    const [price, setPrice] = useState([]);
    const [category, setCategory] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [products, setProducts] = useState([]);

        axios.defaults.withCredentials=true;
        
    useEffect(() => {
        axios.get(url + "products/get_categories.php")
            .then((response) => {
                setCategories(response.data);
            }).catch(error => {
                alert(error.response === undefined ? error : error.response.data.error);
            })
    }, [url]);

    function addNewProduct(e) {
        e.preventDefault();
        if(name !== "" && selectedFile !== null) {
            const json = JSON.stringify({ 
                tuotenimi: name,
                tuotekuvaus: desc,
                ohje: instruction, 
                tieteellinen_nimi: othername,
                hinta: price,
                trnro: category
            });
            
            axios.post(url + 'admin/add_product.php', json, {
            headers: {
            'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                // Lisätään kuva backendiin, kun tiedot on lisätty
                let data = new FormData();
                data.append('file', selectedFile[0]);
                data.append("tuotenro", response.data.tuotenro)
                axios.post(url + "admin/save_img.php", data)
                .catch(error => {
                    alert(error.response ? error.response.data.error : error);
                });
                setName('');
                setDesc('');
                setInstruction('');
                setOthername('');
                setPrice('');  
                setCategory(1);
                setSelectedFile(null);
                axios.get(url + "products/get_products-all.php")
                .then((response) => {
                    setProducts(response.data);
                }).catch(error => {
                    alert(error.response === undefined ? error : error.response.data.error);
                })
            }).catch(error => {
                alert(error.response ? error.response.data.error : error);
            })
        

       

    }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files);
    }

    return (
        <main className="container">
            <h1>Tuotteiden lisääminen</h1>
            <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
            <form onSubmit={addNewProduct}>
                <div className="mt-5 col-lg-6 col-sm">
                    <ul>
                        <h4>Uusi tuote:</h4>
                        <input className="form-control" placeholder="Nimi" value={name} onChange={e => setName(e.target.value)}></input>
                    </ul>
                    <ul>
                        <input className="form-control" placeholder="Kuvaus" value={desc} onChange={e => setDesc(e.target.value)}></input>
                    </ul>
                    <ul>
                        <input className="form-control" placeholder="Hoito-ohje" value={instruction} onChange={e => setInstruction(e.target.value)}></input>
                    </ul>
                    <ul>
                        <input className="form-control" placeholder="Tieteellinen nimi" value={othername} onChange={e => setOthername(e.target.value)}></input>
                    </ul>
                    <ul>
                        <input className="form-control" type="number" step="0.01" placeholder="Hinta" value={price} onChange={e => setPrice(e.target.value)}></input>
                    </ul>
                    <ul>
                        <select className='form-control' value={category} onChange={e => setCategory(e.target.value)}>
                            {categories?.map(category => (
                                <option key={category.trnro}value={category.trnro}>{category.trnimi}
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
            <div className="mt-5 col-lg-6 col-sm"> 
          <h4>Tuotteet</h4>
            <ul className="list-group">
                {products?.map(product => (
                    <div key={product.tuotenro}>
                        <form>
                            <li className="list-group-item d-flex justify-content-between align-items-center">{product.tuotenro}{". "}{product.tuotenimi}</li>
                        </form>
                    </div>
                ))}
            </ul>
        </div>
        </main>
    );
}
