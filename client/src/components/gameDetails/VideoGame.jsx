import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsid } from "../../actions/actions";
import details from "../../actions/details";
import { useEffect } from "react";


export default function Detail( props ){
    
        const dispatch = useDispatch()
        let game = []
        game = useSelector((state)=>state.detail)
        let platforms
        let genres

        platforms = game.platforms?.map(e=>{
            return [...e.platform.name + " "]
        })
        genres = game.genres?.map(e=>{
            return [...e.name + " "]
        })

        useEffect(()=>{
            
            details(props.match.params.id).then(data =>{
                dispatch(detailsid(data))
            })
        }, [dispatch])
        console.log(game)
        
        if (game !== [] || game !== undefined ){
            return(
                <div>
                    {
                        
                        <div>
                            <h1>{game.name}</h1>
        
                            <img src={game.background_image} width="20%" height="50%"  />
                            <div>
                                <label>platforms: {platforms} </label>
                            </div>
                            <div>
                                <label>genres: {genres}</label>
                            </div>
                            <div>
                                <label>description: {game.description_raw?game.description_raw:game.description}</label>
                            </div>
                            <div>
                                <label>release date: {game.releaseDate?game.releaseDate:game.released}</label>
                            </div>
                            <div>
                                <label>rating: {game.rating}</label>
                            </div>
                        </div>
        
                    }
        
                    <Link to="/home">
                        <button>volver</button>
                    </Link>
                </div>
        
            )
        }else{
            return(
                <div>
                    <h1>cargando...</h1>
                </div>
            )
        }
    
    
    
}