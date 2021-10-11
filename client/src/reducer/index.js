let inicialState = {
    games: [],
    genres: [],
    allVideogames:[],
    detail:[],
}


function rootReducer (state = inicialState, action){

    switch(action.type){
        case "GET_VIDEOGAMES":
            return {
                ...state,
                games: action.payload,
                allVideogames: action.payload
            }
        case "GET_GENRES":
            return{
                ...state,
                genres: action.payload
            }
        case "GETBYGENRE":
            let allgames = state.allVideogames
            let filtered = []
            
            if (action.payload === "all") filtered = allgames
            else {
                filtered = allgames.filter(e=>{
                    var flag= false;
                    e.genres.map(f =>{
                        if(f.name === action.payload){
                            flag = true;
                        }
                        return null
                    })
                    if (flag) return e
                    else{
                        return null
                    }
                })
            }
            return{
                ...state,
                games: filtered
            }
        case "CREATED":

            let allthegames = state.allVideogames
            let filter = []

            if (action.payload === "all") filter = allthegames
            else if (action.payload === "created") {
                    filter = allthegames.filter(e =>{
                        if (e.created) return e
                        return null
                    })
            }else if (action.payload === "api"){
                filter = allthegames.filter(e=>{
                    if (!e.created) return e
                    return null
                }
                )
            }
            return{
                ...state,
                games: filter
            }
        case "ORDER":
            let all = state.allVideogames
            let orderGames = []
            if (action.payload === "unorder") orderGames = all
            else if (action.payload === "asc"){
                orderGames = all.sort( (a, b) =>{
                    if (a.name > b.name){
                        return 1;
                    }
                    if (a.name < b.name){
                        return -1;
                    }
                    return 0
                })
            }else if (action.payload === "desc"){
                orderGames = all.sort( (a, b) =>{
                    if (a.name < b.name){
                        return 1;
                    }
                    if (a.name > b.name){
                        return -1;
                    }
                    return 0
                })
            }else if (action.payload === "rating"){
                orderGames = all.sort((a, b)=>{

                    if (a.rating < b.rating){
                        return 1
                    }
                    if (a.rating > b.rating){
                        return -1
                    }
                    return 0
                })
            }
            return{
                ...state,
                games: orderGames
            }
        case "GETBYNAME":
            return {
                ...state,
                games: action.payload,
            }
        case "DETAILS":
            return {
                ...state,
                detail: action.payload
            }
        case "POSTVIDEOGAME":
            return {
                ...state
            }

        default :
            return state;
        
    }

}   

export default rootReducer;