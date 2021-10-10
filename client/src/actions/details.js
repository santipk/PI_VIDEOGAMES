import axios from "axios";

export default async function foo(id){
    var json = await axios.get("http://localhost:3001/videogame/"+id)
    return  json
}