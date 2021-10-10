import axios from "axios";

export default async function foo (name){
    var json = await axios.get("http://localhost:3001/videogames/search?name="+ name)
    console.log(json)
    return  json.data
    
}