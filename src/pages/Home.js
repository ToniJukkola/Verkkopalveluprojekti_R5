import React from "react";
import Hero from "../comp/Hero";

export default function Home() {
    return (
        <>
            <Hero />

            <main className="container">
                <div id="carouselExampleSlidesOnly" className="carousel slide interval" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={require(".././images/tuotenro_1.jpg")} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={require(".././images/tuotenro_2.jpg")} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={require(".././images/tuotenro_3.jpg")} alt="Third slide" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
