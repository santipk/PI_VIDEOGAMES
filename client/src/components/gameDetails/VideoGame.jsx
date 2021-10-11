import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsid } from "../../actions/actions";
import details from "../../actions/details";
import { useEffect } from "react";
import "./VideoGame.css"

export default function Detail( props ){
    
        const dispatch = useDispatch()
        let game = []
        game = useSelector((state)=>state.detail)
        let platforms
        let genres

        platforms = game.platforms?.map(e=>{
            return [...e.platform.name + " "]
        })
        
        genres = game.genres?.map((e , index )=>{
            if (index === game.genres.length -1){
                return[...e.name]
            }else{
                return [...e.name + " / "]
            }
        })
        

        useEffect(()=>{
            
            details(props.match.params.id).then(data =>{
                dispatch(detailsid(data))
            })
        }, [dispatch])
        
        if (game !== [] || game !== undefined ){
            return(
                <div className="total" >
                    {
                        
                        <div className= "box">
                            <h1 className="name" >{game.name}</h1>
                            <div className="contain" >
                                <div>
                                    <img className="image" src={game.background_image} alt={game.background_image}  />
                                </div>
                                <div className="detail" >
                                    <div className= "texts">
                                        <label>platforms: {platforms} </label>
                                    </div>
                                    <div className= "texts">
                                        <label>genres: {genres}</label>
                                    </div>
                                    <div className= "texts">
                                        <label>release date: {game.releaseDate?game.releaseDate:game.released}</label>
                                    </div>
                                    <div className= "texts">
                                        <label>rating: {game.rating}</label>
                                    </div>
                                </div>
                            </div>
                            <div className= "texts">
                                <label>description: {game.description_raw?game.description_raw:game.description}</label>
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