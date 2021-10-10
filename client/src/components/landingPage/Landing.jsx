import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
export default function LandingPage (){
    return (
        <div className="todo">
            <h1 className= "welcome" > bienvenidos!! </h1>
            
            <Link to = "/home">
                <button>ingresar</button>
            </Link>
            
        </div>

    )
}