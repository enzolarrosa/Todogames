import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {filterGenre, getGames, getGenres, orderGame} from '../Redux/actions/index'
import Card from './Card';
import Pagination from './Pagination';
import c from '../styles/ContCards.module.css'
import Select from './Select';
import not from '../img/not.png'

export default function ContCards(){

    const dispatch= useDispatch()
    const games= useSelector(state => state.games)
    const [page, setPage] = useState(1)
    const [gamesPage ,] = useState(10)
    const lastGames= page * gamesPage // 1 * 8
    const [, setOrder] = useState('')
    const firtGames= lastGames - gamesPage // 8 - 8
    const currentGames= games.slice(firtGames,lastGames) //
    const allGenres= useSelector( state => state.genres)

    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    },[dispatch])

    const pagination = (pageNumber) => {
        setPage(pageNumber)
     }

    const handleOrder = async (e) => {
        e.preventDefault()
        dispatch(orderGame(e.target.value))
        setOrder(`${e.target.value}`)
    }

    const handleFilter = async (e) => {
        e.preventDefault()
        dispatch(filterGenre(e.target.value))
        setPage(1)
    }

    return(
        <div className={c.conteiner}>
            <div className={c.contSelect}>
                <Select arr={[{name: 'A - Z'},{name: 'Z - A'},{name: 'Rating +'},{name: 'Rating -'}]} handle={handleOrder} type={'Order By:'}/>
                <Select arr={allGenres} handle={handleFilter} type={'Filter By:'}/>
            </div>
            <div className={c.contMenor}>
            { !currentGames.length ? <div className={c.contLoading}> <img src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='Loading' /> <p>Loading...</p> </div>: games === 'not found'? <div className={c.contLoading}> <img src={not} alt='Loading' /> <p>No games...</p> </div> : currentGames.map(e => {
                        return (
                            <Card key={e.id} id={e.id} name={e.name} img={e.img} rating={e.rating} genres={e.genres} />
                            )})}
            </div>
           <Pagination gamesPage={gamesPage} games={games.length} pagination={pagination} setPage={page} />
            
        </div>
    )
}