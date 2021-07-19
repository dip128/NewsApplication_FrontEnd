import React from 'react'


export default function Card(props) {
    return (
        <div>
           
            <div className="container">
                {props.actions === 'Add' ? <a href={props.href}><button style={{float:'right'}} className="submitbutton">{props.actions}</button></a>
                    :<a href={props.href}><button style={{float:'right'}} className="customebutton">{props.actions}</button></a>}
                <h2>{props.name}</h2>
                <p>{props.desc}</p>
                <br/>
                <hr/>
            </div>
                
        </div>
    )
}
