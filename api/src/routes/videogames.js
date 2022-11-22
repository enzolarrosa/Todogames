require('dotenv').config()
const {Router} = require ('express')
const route= Router()
const {getGames, getDetail} = require('../controllers/functions')
const {Videogame,Genre} = require('../db')


//ruta que trea los juegos solicitados
route.get('/', async (req,res) => {
     try {
        const {name} = req.query
        const allGames = await getGames();
        //si mandan name por query, hago la busqueda de un juego que incluya ese name
        if(name && name.length >0) {
            const game= allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if (game.length) {return res.json(game)}
            else {return res.send('not')}
        }
        //si no mandan query, retorno todos los juegos 
        return res.json(allGames)

     } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
     }
})

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