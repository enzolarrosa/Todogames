import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/Card.module.css'
import { AiFillStar } from "react-icons/ai";


export default function Card ( {id,name,img,release,rating,description,genres,platform}){ 
    genres= genres.map( e => {return e.name})
    genres= genres.join(', ').split(',').join()

    return (
        <Link style={{textDecoration:'none'}} to={`/detail/${id}`} >
        <div className={s.conteiner}>
            <div className={s.divImg}>
                <img src={img} alt='Video Game'/>
            </div>
            <div className={s.divP}>
                <p className={s.title}>{name}</p>
                <p className={s.rating}> <AiFillStar className={s.icon}/>{rating}</p>
                <p>Genres: {' ' + genres} </p>
            </div>
        </div>
        </Link> 
    )
}