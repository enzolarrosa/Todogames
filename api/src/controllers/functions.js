require("dotenv").config();
const axios = require("axios");
const { APYKEY } = process.env;
const { Videogame, Genre } = require("../db");

//funcion que busca los video games en la DB
const apiGames = async () => {
  try {
      let url = `https://api.rawg.io/api/games?key=${APYKEY}`;
      let arr= []
      for (i = 0; i < 15; i++) {
        let api = await axios.get(url);
            api.data.results.map(async (e) => arr.push({
            id: e.id,
            name: e.name,
            img: e.background_image,
            date: e.released,
            rating: e.rating,
            screen: [e.short_screenshots[1].image,e.short_screenshots[2].image,e.short_screenshots[3].image],
            platform: e.platforms.map((e) => e.platform.name
            ),
            genre: e.genres.map( e => {return e.name})
          })
        );
        url = api.data.next;
      }
      return arr;
  } catch (error) {
    return error.message;
  }
};


const dbGames= async () => {
    const games = await Videogame.findAll({
      include: [{
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
      }]}
    )
    return games
}

const getGames = async () => {
  const api= await apiGames()
  const db = await dbGames()
  const all = [...api,...db]
  return all 
}

//funcion que agarra los Genres de la API Y los crea en la DB
const getGenre = async () => {
  try {
        const url = await axios.get(`https://api.rawg.io/api/genres?key=${APYKEY}`);
        url.data.results.map(async (e) => {
          await Genre.create({
            name: e.name.toLowerCase(),
          });
        });
  } catch (error) {
    return error.message;
  }
};

const getDetail = async (id) => {
  if(id.includes('-')){
      const game = await Videogame.findOne({
        where: {
          id
        },
        include: [{
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
      }],
      })
      return game
  } else {
    const apiG= await apiGames()
    const game= apiG.filter(e => e.id == id)
    const data = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APYKEY}`)
    const d= data.data
    return [{
      id: d.id,
      name: d.name,
      image: d.background_image,
      date: d.released,
      rating: d.rating,
      play: d.website,
      description: d.description_raw,
      screen: game[0].screen ,
      genres: d.genres.map(e => e.name),
      platform: d.platforms.map(e => e.platform.name),
    }]
  }
}

module.exports = {
  getGames,
  getGenre,
  getDetail
};
