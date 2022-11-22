const {Router} = require ('express')
const route= Router()
const {getGenre} = require('../controllers/functions')
const {Genre} = require('../db')

//Ruta que trae los generos
route.get('/',async (req,res) => {
    try {
        const genres = await Genre.findAll()
        res.json(genres)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports= route