import axios from "axios";

export default async function foo (){
    var json = await axios.get("http://localhost:3001/videogames")
    return  json
    
}
