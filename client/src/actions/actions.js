import axios from "axios"



export function postVideoGame( payload ){
    return async function (data){
        const response = await axios.post("http://localhost:3001/videogame", payload)
        return response
    }
}

export function getVideogames(json){ 
        return {
            type: "GET_VIDEOGAMES",
            payload: json.data
        }
}
export function getGenresDB(json){
    return{
        type: "GET_GENRES",
        payload: json.data
    }
}

export function getByGenres(payload){
    return {
        type:"GETBYGENRE",
        payload
    }
}
export function getByCreated(payload){
    return{
        type:"CREATED",
        payload
    }
}
export function order(payload){
    return{
        type:"ORDER",
        payload
    }
}
export function getByGameName(json){
    return {
        type: "GETBYNAME",
        payload: json
    }
}
export function detailsid(json){
    return {
        type: "DETAILS",
        payload: json.data
    }
}
