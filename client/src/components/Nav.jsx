import React from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSearch } from '../Redux/actions';
import n from '../styles/Nav.module.css'

export default function Nav(){
    const dispatch = useDispatch()
    const handleName = async (e) => {
      e.preventDefault()
      dispatch(getSearch(e.target.value))
    }

    return(
     <div className={n.conteiner}>
        <div className={n.contSearch}>
            <div className={n.create}>
                <Link to='/create'>
                <button>
                    Create VideoGame
                </button>
                </Link>
            </div>
            <div className={n.searchBar}>
            <button>
            <BiSearchAlt/>
            </button>
            <input onChange={(e) => handleName(e)} className={n.input} type='search' placeholder='Videogame...' />
            </div>
            <div>
                <button id='sun' className='none'>
                <FaSun/>
                </button>
                <button id='moon'>
                <FaMoon/>
                </button>
            </div>
        </div>
     </div>
     
    )
}