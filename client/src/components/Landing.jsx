import React from 'react';
import {Link} from 'react-router-dom'
import l from '../styles/Landing.module.css'

export default function Landing () {
    return (
        <div className={l.conteiner}>
            <div className={l.contTitle}>
                <div className={l.cont} >
                <h1 className={l.h1}>🎮 Welcome to TodoGames 🎮</h1>
                </div>
            <Link to='/home'>
            <button className={l.btn}>Let's Go</button>
            </Link>
            </div>
        </div>
    )
}