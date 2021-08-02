import React from 'react'
import DeleteButton from '../../atom/button/DeleteButton/DeleteButton.js'
import SubmitButton from '../../atom/button/Submit/SubmitButton.js'


export default function Card(props) {
    return (
        <div>
           
            <div className="container">
                {props.actions === 'Add' ? <a href={props.href} style={{float:'right'}}><SubmitButton title='Submit'/></a>
                    :<a href={props.href} style={{float:'right'}}><DeleteButton/></a>}
                <h2>{props.name}</h2>
                <p>{props.desc}</p>
                <br/>
                <hr/>
            </div>
                
        </div>
    )
}
