import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form'
import {nameValidate} from '../functions'
import {getGenres} from '../Redux/actions/index'


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
         console.log(stateSelect)
    }

    const handleSelects = (e) =>{
    e.preventDefault()
    stateSelect({
       ...select,
       [e.target.name]: [...e.target.name,e.target.value] 
    })
    }

    return(
        <div>
            <h1>Create your video game</h1>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>*Name:</label>
                    <input type="text" {...register('name' , {
                        required: true,
                        validate: nameValidate
                    })}/>
                    {errors.name?.type === 'required' && <span>Name is required</span>}
                    {errors.name?.type !== 'required' && errors.name && <span> Must contain between 2 and 12 characters</span>}
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" {...register('image', {
                        pattern: /.*(png|jpg|jpeg|gif)$/
                    })}/>
                    {errors.image?.type === 'pattern' && <span>Insert a url</span>}
                </div>
                <div>
                    <label>*Description:</label>
                    <input type="textarea" {...register('description', {
                    required:true,
                    minLength:10
                    })}/>
                    {errors.description?.type === 'required' && <span>Description is required</span>}
                    {errors.description?.type === 'minLength' && <span>Must contain at least 10 characters</span>}
                </div>
                <div>
                    <label>Rating:</label>
                    <select {...register('rating', {
                    required:true
                    })}>
                            <option key={1} value={1}>1</option>
                            <option key={2} value={2}>2</option>
                            <option key={3} value={3}>3</option>
                            <option key={4} value={4}>4</option>
                            <option key={5} value={5}>5</option>
                    </select>
                </div>
                <div>
                    <label>*Date:</label>
                    <input type="date" {...register('date', {
                        required:true
                    })}/>
                    {errors.date?.type === 'required' && <span>Description is required</span>}
                </div>
                <div>
                    <label>*Genres:</label>
                    <select onChange={(e) => handleSelects(e) }>
                         {genres.length && genres.map( e => (
                            <option name={e.name} key={e.id} value={e.name}>
                                {e.name}
                            </option>
                         ))}
                    </select>
                    {errors.genres?.type === 'required' && <span>Genres is required</span>}
                </div>
                <div>
                    <label>*Platform:</label>
                    <select onChange={(e) => handleSelects(e) }>
                        {platforms.map( e => (
                            <option name={e} key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                    {errors.platform?.type === 'required' && <span>Platform is required</span>}

                </div>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}