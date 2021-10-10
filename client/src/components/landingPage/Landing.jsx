import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage (){
    return (
        <div>
            <h1> bienvenidos!! </h1>
            <Link to = "/home">
                <button>ingresar</button>
            </Link>
        </div>
    )
}