import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByGameName } from "../../actions/actions";
import getByName from "../../actions/getByName.js"


export default function Searchbar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handlerInput(e){

        
        setName(e.target.value)

    }
    function handlerSubmit(e){
        e.preventDefault()
        getByName(name).then(data=>{
            dispatch(getByGameName(data))
        })
        setName("")
    }
    return (
        <form onSubmit= {e=> handlerSubmit(e)}  >
            <input value = {name} onChange= {e=> handlerInput(e)} type="text" placeholder="buscar..."  />
            <button  type = "submit" >buscar</button>
        </form>
    )
}