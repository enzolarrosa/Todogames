require('dotenv').config()
const {Router} = require ('express')
const route= Router()
const {apiGames, getDetail, dbGames} = require('../controllers/functions')
const {Videogame,Genre} = require('../db')
const imgPost = "https://media.istockphoto.com/id/1178429224/vector/red-cross-on-white-background-isolated-vector-illustration-circle-shape-no-button-negative.jpg?s=612x612&w=0&k=20&c=DOtEZDSLR7wze3xYin-oBjJPSSmLm7JvnvQhS1T7-U8="


//ruta que trea los juegos solicitados
route.get('/', async (req,res) => {
     try {
        const {name} = req.query
        const db = await dbGames()
        const api = await apiGames()
        const all = db.concat(api)
        //si mandan name por query, hago la busqueda de un juego que incluya ese name
        if(name) {
            const game= all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return game.length?  res.json(game) :  res.send('not found')
        }
        //si no mandan query, retorno todos los juegos 
        return res.json(all)

     } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
     }
})

route.post('/', async (req,res) => {
   try {

      const {name,img,description,rating,date,genres,platform} = req.body
            const save = await Videogame.create({
               name,
               img,
               date,
               rating,
               description,
               platform  
         })
         genres.map(async (e) => {
           let post = await Genre.findAll({
            where : {name: e.toLowerCase()}
           })
           await save.addGenre(post)
         })
      
      res.send('creado')
   } catch (error) {
      res.status(400).json("error:" + error.message)
   }
} )

//ruta que trae un videogame por id
route.get('/:id', async (req,res) => {
   try {
      const id = req.params.id
      const game= await getDetail(id)
      res.json(game)

   } catch (error) {
      return res.status(400).json({error: error.message})
   }
})

module.exports = route