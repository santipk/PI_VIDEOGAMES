import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getVideogames, getGenresDB, getByGenres, getByCreated, order } from "../../actions/actions";
import getGames from "../../actions/getGames";
import { Link } from "react-router-dom";
import Card from "../cards/CardGame";
import Paginado from "../paginado/Paginado.jsx";
import "./Home.css"
import getGenres from "../../actions/getGenres";
import Searchbar from "../searchBar/SearchBar.jsx";

export default function Home(){
    const [orden, setOrden] = useState(``)
    const dispatch = useDispatch()
    const allGames = useSelector ((state)=> state.games)
    const allgenres = useSelector ((state)=> state.genres)
    const [page, setPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const lastCard = page * videogamesPerPage;
    const firstCard = lastCard - videogamesPerPage;
    let renderCards = allGames.slice(firstCard, lastCard)
    const PagesMax = allGames.length/ videogamesPerPage;
    
    const pagina = (pag)=>{
        if(pag === "<" && page > 1){
            pag = page - 1;
        }else if(pag ===">" && page < PagesMax){
            pag = page + 1;
        }if (Number.isInteger(pag)){
            setPage(pag)
        } 
    }
    useEffect( ()=>{
        getGames().then( data =>{
            dispatch(getVideogames(data))
        });
        getGenres().then(data =>{
            dispatch(getGenresDB(data))
        });
        
    }, [dispatch] )

    function HandlerFilterByGenre(e){
        e.preventDefault()
        dispatch(getByGenres(e.target.value))
        setPage(1)
    }

    function handlerFilterByCreated(e){
        e.preventDefault()
        dispatch(getByCreated(e.target.value))
        setPage(1)
    }

    function handlerOrder(e){
        e.preventDefault()
        if (e.target.value === "unorder" ) {
            getGames().then( data =>{
                dispatch(getVideogames(data))
            })
        }else{
            dispatch(order(e.target.value))
        }
        setPage(1)
        setOrden(`orden ${e.target.value}`)
    }
    
    

    
    return (
        <div>
            
            <Link  to = "/create">
                <button>
                    crear nuevo juego
                </button>
                </Link>
            <div>
                <select className="options" onChange={e=> handlerOrder(e)} name="orden" id="1">
                    <option value="unorder">original</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="rating">rating</option>
                </select>
                <select className="options" onChange={e => HandlerFilterByGenre(e)} name="genres" id="2">
                    <option value="all">all genres</option>
                    {
                        allgenres.map(e=>{
                            return<option key = {e.name} value={e.name}>{e.name}</option>
                        })
                    }
                </select>
                <select className="options" onChange={e => handlerFilterByCreated(e)} name="creados" id="3">
                    <option value="all">todos</option>
                    <option value="created">creados</option>
                    <option value="api">existentes</option>
                </select>
                <Paginado videogamesPerPage = {videogamesPerPage} allGames = {allGames.length} pagina={pagina} />
                <Searchbar/>
                <div className= "container">
                {
                    renderCards.map(e =>{
                        
                        return (
                            <Fragment key={e.id + "b"}>
                                <Link key={e.id}    className = "link" to = {"/home/" + e.id}>
                                    <Card  key={e.id+1+"a"} name = {e.name} image = {e.background_image} genres = {e.genres} rating = {e.rating}  />
                                </Link>
                            </Fragment>  
                        )
                    })
                }
                
                </div>
                
                
            </div>
        </div>

    )
}