import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {getGenres, postGame} from '../Redux/actions/index';
import c from '../styles/Create.module.css';

function validate (input) {
    const vName = /^[a-zA-Z\s]+$/ ;
    const vImg= /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    let error = {}
    if (!vName.test(input.name)) {
        error.name = "Do not use special characters and/or numbers"
    }
    if (!vImg.test(input.img)) {
        error.img = "Is not a image"
    }
    if(input.name?.length === 0) {
        error.name = "Write a name"
    }
    if(input.rating?.length === 0) {
        error.rating = "Choose a rating"
    }
    if(input.date?.length === 0) {
        error.date = "Write a date"
    }
    if(input.genres?.length === 0) {
        error.genres = "Choose a genre"
    }
    if(input.platform?.length === 0) {
        error.platform = "Choose a platform"
    }
    if(input.description.length < 10) {
        error.description= "Write at least 10 characters"
    }
    
    return error
}

export default function Create () {

    const [input, setInput] = useState({
     name:'',
     img:'',
     description:'',
     rating:'',
     date:'',
     genres:[],
     platform: []
    })
     
    const [err,setErr] = useState({})
    const dispatch= useDispatch()
    const history = useHistory()
    const genres = useSelector(state => state.genres)

    useEffect(() =>{
        dispatch(getGenres())
    },[])

    const platforms = ['PC','Linux','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','PSVita','macOS','Nintendo Switch','Android','IOS','Xbox','Xbox 360','Xbox One','Xbox series S/X']

    const onSubmit = async (e) => {
        e.preventDefault()
        if(err.name || err.description || err.rating || err.img || err.date || err.genres || err.plaftorm || input.name.length=== 0) {return};
        if(!err.length){
            dispatch(postGame(input))
            history.push('/home')
        }
    }

    const handleInputs = (e) =>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErr(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handlePlatform = (e) =>{
        e.preventDefault()
        if(!input.platform.includes(e.target.value)){
            setInput({
                ...input,
                platform: [...input.platform,e.target.value] 
            }) 
            setErr(validate({
                ...input,
                platform: [...input.platform,e.target.value] 
            }))
        }
    }

    const handleGenres = (e) =>{
        e.preventDefault()
        if(!input.genres.includes(e.target.value)){
            setInput({
               ...input,
               genres: [...input.genres,e.target.value] 
            })
            setErr(validate({
                ...input,
                genres: [...input.genres,e.target.value]
            }))
        }
    }

    return(
        <div className={c.conteinerMay}>
        <div className={c.conteiner}>
            <h1 className={c.title}>Create your video game</h1>
            <form className={c.contFrom} onSubmit={(e) => onSubmit(e)}>
                <div className={c.divInput}>
                    <label className={c.label}>Name</label>
                    <input className={c.input} onChange={(e) => handleInputs(e)} name='name' type="text" />
                    {err.name && <span className={c.errors}>{err.name}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Image URL</label>
                    <input className={c.input} onChange={(e) => handleInputs(e)} name='img'  type="text" />
                    {err.img && <span className={c.errors}>{err.img}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Description</label>
                    <textarea className={c.input} onChange={(e) => handleInputs(e)} cols="30" rows="5" name='description'  ></textarea>
                    {err.description && <span className={c.errors}>{err.description}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Rating</label>
                    <select onChange={(e) => handleInputs(e)} name='rating' className={c.select} >
                            <option></option>
                            <option key={1}  value={1}>1</option>
                            <option key={2}  value={2}>2</option>
                            <option key={3}  value={3}>3</option>
                               <option key={4}  value={4}>4</option>
                            <option key={5}  value={5}>5</option>
                    </select>
                    {err.rating && <span className={c.errors}>{err.rating}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Date</label>
                    <input onChange={(e) => handleInputs(e)} className={c.input} name='date'  type="date" />
                    {err.date && <span className={c.errors}>{err.date}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Genres</label>
                    <select className={c.select} onChange={(e) => handleGenres(e) }>
                    <option></option>
                         {genres.length && genres.map( e => (
                            <option name='genres' key={e.id} value={e.name}>
                                {e.name}
                            </option>
                         ))}
                    </select>
                    {err.genres && <span className={c.errors}>{err.genres}</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Platform</label>
                    <select className={c.select} onChange={(e) => handlePlatform(e) }>
                        <option></option>
                        {platforms.map( e => (
                            <option name='platform' key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    {err.platform && <span className={c.errors}>{err.platform}</span>}

                </div>
                <div className={c.divButtons}>
                <Link to='/home'>
                <button className={c.button}>Back</button>
                </Link>
                <input className={c.buttonSubmit} type='submit' value='Submit'/>
                </div>
            </form>
        </div>
        </div>
    )
}