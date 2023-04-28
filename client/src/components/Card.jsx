import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/Card.module.css'
import { AiFillStar } from "react-icons/ai";


export default function Card ( {id,name,img,rating,genres}){ 

    const gen= genres.map(e => {return e.name.toLowerCase()}).join(', ').split(',').join()

    return (
        <Link className={s.conteiner} style={{textDecoration:'none'}} to={`/detail/${id}`} >
        <div className={s.cont}>
            <div className={s.divImg}>
                <img src={img} alt='Video Game'/>
            </div>
            <div className={s.divP}>
                <p className={s.title}>{name}</p>
                <p className={s.rating}> <AiFillStar className={s.icon}/>{rating}</p>
                <p>Genres: {' ' + gen} </p>
            </div>
        </div>
        </Link> 
    )
}