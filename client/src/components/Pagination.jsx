import React from 'react';
import p from '../styles/Pagination.module.css'
import { BiChevronLeft, BiChevronRight  } from "react-icons/bi";

export default function Pagination({gamesPage, games, pagination, setPage}){
    
    const pageNumber= []
    const count = games/gamesPage

    for(let i=0; i<= Math.ceil(count - 1); i++){
        pageNumber.push(i+1)
    }
    const end= pageNumber[pageNumber.length - 1]
    const start = pageNumber[0]
    const prev= setPage - 1
    const next = setPage + 1
    
    return(
        <div className={p.conteiner}>
            <div className={p.contMenor}>
                {pageNumber.length? start !== setPage && <button onClick={() => pagination(prev)}><BiChevronLeft className={p.icon} /> {' Previous'}</button> : console.log()}
                {pageNumber.length? <p><b>{setPage}</b> of {end}</p> : console.log()}
                {pageNumber.length? end !== setPage && <button onClick={() => pagination(next)}>{'Next '} <BiChevronRight className={p.icon}/></button>: console.log()}
            </div>

        </div>
    )
}