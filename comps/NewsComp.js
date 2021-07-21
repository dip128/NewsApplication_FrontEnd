import React from 'react'


export default function NewsComp(props) {
    return (
        <div className="container">
           
            <h2>{props.news_title}</h2>
           
            <h4>Click-{props.count}</h4>
            <p>{props.desc}</p>
            <p><h5>Published On -</h5>{new Date(props.date).toLocaleDateString()}</p>
             <a href={props.href}><button className="submitbutton">Visit</button></a>   
            <hr/>
        </div>
    )
}
