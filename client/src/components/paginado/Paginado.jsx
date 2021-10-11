import React from "react"

import "./Paginado.css"

export default function paginado ({videogamesPerPage, allGames, pagina }){

    const pagNum = [];
    pagNum.push ("<")
    for (let  i = 1; i<Math.ceil(allGames/videogamesPerPage) +1; i++){

        pagNum.push(i)
    }
    pagNum.push (">")
    return (
        <nav className = "pageBar">
            <ul className = "lista">
                {pagNum.map(e=>{
                    return(
                        <li className ="item" key = {e} >
                            <a  className= "a"  onClick={()=>pagina(e)}>{e}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}