import axios from "axios";

export default async function getGenres(){
    var json = await axios.get("http://localhost:3001/genres")
    return  json
}