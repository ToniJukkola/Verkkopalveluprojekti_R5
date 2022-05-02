import React from "react"
import { Link } from 'react-router-dom'
import Orderlist from "../comp/Orderlist";

export default function Admin({ url }) {
    return (
        <main className="container">
            <div>
                <h1>Tervetuloa ylläpitäjä!</h1>
                <h2>Hallitse tuotteita ja tuoteryhmiä</h2>

                <div className="d-grid gap-3 justify-content-start">
                    <Link className="btn btn-outline-dark" to={"/admin/addproduct/"}>Lisää tuote</Link>
                    <Link className="btn btn-outline-dark" to={"/admin/edit/"}>Tuotteiden hallinta</Link>

                    <Link className="btn btn-outline-dark" to={"/admin/addcategory/"}>Tuoteryhmien hallinta</Link>
                </div>
            </div>

            <div className="mt-5">
            <h2>Hallitse tilauksia</h2>
                <Orderlist url={url} />
            </div>
        </main>
    );
}