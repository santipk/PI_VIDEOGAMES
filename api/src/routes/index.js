const { Router, application, response } = require('express');
const axios = require('axios');
const {Videogame, Genre} = require("../db");

const {Op} = require ("Sequelize") 

const API_KEY = "?key=063021ca915a4a30bfa1411c62401c9b"
const router = Router();

async function cargarGenres(){
    try{ 
        let apiGenres =  await axios.get("https://api.rawg.io/api/genres"+API_KEY)
        apiGenres = apiGenres.data.results.map(e =>{
            return {name: e.name}
        })
        Genre.bulkCreate(apiGenres)
        console.log('Genres loaded') 
    } catch (error) {        
        console.log(error)
    }
}
cargarGenres()

// axios.<method> will now provide autocomplete and parameter typings

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res)=>{
    var games = await axios.get("https://api.rawg.io/api/games"+API_KEY);
    var respuesta = []
    
    respuesta.push(...games.data.results);
    
    for ( var i = 1; i < 5 ; i++){
        games = await axios.get(games.data.next);
        
        respuesta.push(...games.data.results)
    
    }
    try {
        var db = await Videogame.findAll({include: {model:Genre}})
    }
    catch (e){
        console.log (e) 
    }
    if (db ==! [] || db || db ==! undefined) respuesta.push(...db)
    res.status(200).json(respuesta);
    
}) 

router.get("/videogames/search", async (req,res)=>{
    let {name} = req.query
    var games = await axios.get("https://api.rawg.io/api/games"+API_KEY+"&search="+name)
    
    try {
        var db = await Videogame.findAll({
            where: {name: {[Op.iLike]: `%${name}%`}},
            include: {model:Genre}
        })
    }
    catch (e){
        console.log (e) 
    }
    if (db ==! [] || db || db ==! undefined) games.data.results.push(...db)
    res.status(200).json(games.data.results)
})

router.get("/videogame/:id", async (req,res)=>{
    let {id} = req.params
    
    try{
        if(id.length === 36){   //las uuid son de length 36
            
            const localGame = await Videogame.findAll({
                where: {id: id},
                include: [{model:Genre}]
            })
            console.log(localGame)
            if(localGame){
                return res.status(200).json(localGame[0])
            }
        
        }else if(id.length !== 36){ 
            const game = await axios.get(`https://api.rawg.io/api/games/${id}${API_KEY}`);
            res.status(200).json(game.data)
        }
        else{
            res.status(404).send("no se encontro el juego")
        }
    }catch(err){
        return res.send(err)
    }
    
})

router.get("/genres", async(req,res)=>{

    try {
        const genres = await Genre.findAll()
        res.status(200).send(genres)
    } catch (error) {
        console.log(error)
    }

})
router.post("/videogame",async (req, res)=>{
    let { genresId ,name, description, releaseDate, rating, platforms} = req.body
    let genr = []
    try {
        const  videoGame = await Videogame.create({
            name,
            description,
            releaseDate,
            rating,
            platforms,
            created:true
        })
        let gen = []
        for (let i = 0; i< genresId.length; i++){
            gen.push( await Genre.findByPk(genresId[i]))
            
        }
        videoGame.addGenre(gen)
        

        res.status(200).json(videoGame)
    }catch (e){
        console.log(e) 
    } 
})


module.exports = router;
