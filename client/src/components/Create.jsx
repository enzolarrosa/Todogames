import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {nameValidate} from '../functions';
import {getGenres} from '../Redux/actions/index';
import c from '../styles/Create.module.css';


export default function Create () {

    const { register,formState:{errors}, handleSubmit} = useForm()

    const [select, stateSelect] = useState({
     genres:[],
     platform: []
    })

    const dispatch= useDispatch()
    const genres = useSelector(state => state.genres)

    useEffect(() =>{
        dispatch(getGenres())
    },[dispatch])

    const platforms = ['PC','Linux','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','PSVita','macOS','Nintendo Switch','Android','IOS','Xbox','Xbox 360','Xbox One','Xbox series S/X']

    const submit = async (data) => {
        const obj= {...data,
        ...select
        }
        console.log(obj)
        console.log(select)
    }

    const handlePlatform = (e) =>{
        e.preventDefault()
        console.log('hola: ' + select.platform)
        if(!select.platform.includes(e.target.value)){
            stateSelect({
               ...select,
               platform: [...select.platform,e.target.value] 
            }) 
        }
    }

    const hanldeGenres = (e) =>{
        e.preventDefault()
        if(!select.genres.includes(e.target.value)){
            stateSelect({
               ...select,
               genres: [...select.genres,e.target.value] 
            }) 
        }
    }

    return(
        <div className={c.conteinerMay}>
        <div className={c.conteiner}>
            <h1 className={c.title}>Create your video game</h1>
            <form className={c.contFrom} onSubmit={handleSubmit(submit)}>
                <div className={c.divInput}>
                    <label className={c.label}>Name</label>
                    <input className={c.input} placeholder=' ' type="text" {...register('name' , {
                        required: true,
                        validate: nameValidate
                    })}/>
                    {errors.name?.type === 'required' && <span className={c.errors}>Name is required</span>}
                    {errors.name?.type !== 'required' && errors.name && <span className={c.errors}> Must contain between 2 and 12 characters</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Image URL</label>
                    <input className={c.input} placeholder=' '  type="text" {...register('img', {
                        pattern: /.*(png|jpg|jpeg|gif)$/
                    })}/>
                    {errors.image?.type === 'pattern' && <span className={c.errors}>Insert a url</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Description</label>
                    <textarea className={c.input} cols="30" rows="5" placeholder=' '  {...register('description', {
                    required:true,
                    minLength:10
                    })}></textarea>
                    {errors.description?.type === 'required' && <span className={c.errors}>Description is required</span>}
                    {errors.description?.type === 'minLength' && <span className={c.errors}>Must contain at least 10 characters</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Rating</label>
                    <select className={c.select} {...register('rating', {
                    required:true
                    })}>    <option></option>
                            <option key={1}  value={1}>1</option>
                            <option key={2}  value={2}>2</option>
                            <option key={3}  value={3}>3</option>
                            <option key={4}  value={4}>4</option>
                            <option key={5}  value={5}>5</option>
                    </select>
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Date</label>
                    <input className={c.input} placeholder=' '  type="date" {...register('date', {
                        required:true
                    })}/>
                    {errors.date?.type === 'required' && <span className={c.errors}>Date is required</span>}
                </div>
                <div className={c.divInput}>
                    <label className={c.label}>Genres</label>
                    <select className={c.select} onChange={(e) => hanldeGenres(e) }>
                    <option></option>
                         {genres.length && genres.map( e => (
                            <option name='genres' key={e.id} value={e.name}>
                                {e.name}
                            </option>
                         ))}
                    </select>
                    {errors.genres?.type === 'required' && <span>Genres is required</span>}
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
                    {errors.platform?.type === 'required' && <span>Platform is required</span>}

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