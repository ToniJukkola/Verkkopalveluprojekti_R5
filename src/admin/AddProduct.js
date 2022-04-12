import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function AddProduct({ url }) {
    const [name, setName] = useState([]);
    const [desc, setDesc] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const [othername, setOthername] = useState([]);
    const [price, setPrice] = useState([]);
    const [category, selectCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [products, setProduct] = useState([]);

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
        const json = JSON.stringify({ 
            tuotenimi: name,
            tuotekuvaus: desc,
            ohje: instruction, 
            tieteellinen_nimi: othername,
            hinta: price,
            trnro: category
         });
         console.log(json);
        axios.post(url + 'admin/add_product.php', json, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            setName(name => [...name, response.data]);
            setName('');
             setDesc(desc => [...desc, response.data]);
             setDesc('');
             setInstruction(instruction => [...instruction, response.data]);
             setInstruction('');
             setOthername(othername => [...othername, response.data]);
             setOthername('');
             setPrice(price => [...price, response.data]);
             setPrice('');   
             selectCategory(category => [...category, response.data]);
             selectCategory('');
                axios.get(url + "products/get_products.php")
                .then((response) => {
                    setName(response.data);
                    setDesc(response.data);
                    setInstruction(response.data);
                    setOthername(response.data);
                    setInstruction(response.data);
                    setPrice(response.data);
                    selectCategory(response.data);
                }).catch(error => {
                    alert(error.response === undefined ? error : error.response.data.error);
                })
        }).catch(error => {
            alert(error.response ? error.response.data.error : error);
        })
        

       
        // Tää koodi tulee sit Tonin tuotekoodin .then sisälle
        let data = new FormData();
        data.append('file', selectedFile[0]);
        axios.post(url + "admin/save_img.php", data)
        .then((response) => {
          
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
                        <select className='form-control' value={category} onChange={e => selectCategory(e.target.value)}>
                            {categories?.map(category => (
                                <option key={category.trnro}>{category.trnimi}{category.trnro}
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
           </form> 
        </main>
    );
}