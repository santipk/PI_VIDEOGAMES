import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import getGenres from "../../actions/getGenres";
import { getGenresDB } from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { postVideoGame } from "../../actions/actions";


export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector(state=> state.genres)
    
    const [input, setInput] = useState({
        genresId: [] ,
        name: "",
        description: "" ,
        releaseDate: "",
        rating: "",
        platforms: [] ,
        
    })
    useEffect(()=>{
        getGenres().then(data =>{
            dispatch(getGenresDB(data))
        })
    })

    

    function handelchange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        }) 
    }
    function handlecheck(e){
        if ( e.target.checked){
            setInput({
                ...input,
                genresId: [...input.genresId, e.target.value]
            })
        }
        if ( !e.target.checked){
            setInput({
                ...input,
                genresId: input.genresId.filter(p => {
                    
                    if (p!==e.target.value) return p
                })
            })
        }
    }

    function handlerPlatforms(e){
        
        if (e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, {
                    platform:{
                        name: e.target.value
                    }
                    
                } ]
            })
        }
        if (!e.target.checked){
            
            setInput({
                ...input,
                platforms: input.platforms.filter(p=>{
                    if (p.platform.name !== e.target.value) return p
                }  )
            })
        }
        
    }

    function handlersubmit(e){
        e.preventDefault()
        
        dispatch( postVideoGame(input) )
        alert("game created")
        setInput({
            genresId: [] ,
            name: "",
            description: "" ,
            releaseDate: "",
            rating: "",
            platforms: [] ,
        })
        history.push("/home")
    }

    


    return(
        <div>
            <Link to = "/home"><button> volver</button></Link>
            <form onSubmit= {e =>{handlersubmit(e)}}>
                <div>
                    <label >Name: </label>
                    <input onChange={e=>{handelchange(e)}} required type="text" value ={input.name} name="name" />
                </div>
                <div>
                    <label >Description: </label>
                    <input onChange={e=>{handelchange(e)}} required type="text" value = {input.description} name="description" />
                </div>
                <div>
                    <label>ReleaseDate: </label>
                    <input
                            onChange={e=>{handelchange(e)}}
                            type="date"
                            value={input.releaseDate}
                            min="2000-01-01" max="2029-12-31"
                            name="releaseDate"></input>
                </div>
                <div>
                    <label>Rating: (0.0 - 5.0) </label>
                    <input onChange={e=>{handelchange(e)}} type="number" placeholder="2.5"   min="0.0" max="5" step="0.1" name="rating" />
                </div>
                <div><label>genres: </label>{
                    genres.map(e=>{
                        return(
                            <div>
                                <label>{e.name}:</label>
                                <input key={e.id} type="checkbox" name={e.name} value={e.id} onChange={e=>{handlecheck(e)}} />
                            </div>
                        )})
                }
                
                    <label>platforms: </label>
                    <div>
                        <label>pc</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="pc" value="pc" />
                    </div>
                    <div>
                        <label>PlayStation 5</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="PlayStation 5" value="PlayStation 5" />
                    </div>
                    <div>
                        <label>PlayStation 4</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="PlayStation 4" value="PlayStation 4" />
                    </div>
                    <div>
                        <label>PlayStation 3</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="PlayStation 3" value="PlayStation 3" />
                    </div>
                    <div>
                        <label>Xbox 360</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="Xbox 360" value="Xbox 360" />
                    </div>
                    <div>
                        <label>Xbox One</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="Xbox One" value="Xbox One" />
                    </div>
                    <div>
                        <label>Xbox Series S/X</label>
                        <input onChange={e=>{handlerPlatforms(e) }}  type="checkbox" name="Xbox Series S/X" value="Xbox Series S/X" />
                    </div>
                    <div>
                        <label>Nintendo Switch</label>
                        <input onChange={e=>{handlerPlatforms(e) }} type="checkbox" name="Nintendo Switch" value="Nintendo Switch" />
                    </div>

                    <button  type="submit" >Create Game</button>
                    
                </div>
            </form>
            
            
        </div>
    )
}