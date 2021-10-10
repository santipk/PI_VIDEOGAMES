import React from "react";
import "./CardGame.css"
export default function Card({ name, image , genres, rating}){
    let generos = genres.map(element => {
        return [...element.name+ " / "]
    })
    if (generos.length !== 0){
        generos[generos.length - 1].pop()
        generos[generos.length - 1].pop()
        generos[generos.length - 1].pop()
        }
    
    

    return(
        
        <div className = "card">
            <img src={image} alt={image} className="img" width="90%" height="150px" gap="5px"  />
            <p className = "text">{name}</p>
            <p className = "text">{generos}</p>
            <p className = "rating">rating: {rating}</p>
        </div>

    )
}