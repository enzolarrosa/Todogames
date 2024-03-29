import React from 'react';


export default function Select ({arr, handle, type}) {
     
    

    return  ( 

            <select onChange={(e) => handle(e)}>
                <option>{type}</option>
                {arr.map(e => {return(
                <option key={e.name? e.name: e} value={e.name? e.name: e}>{e.name? e.name: e}</option>
                )})}
            </select>

    )
}