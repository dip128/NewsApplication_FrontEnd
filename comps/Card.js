import React from 'react'


export default function Card(props) {
    return (
        <div>
           
            <div className="card">
                <img src={props.img} />
                <div className="card-body">
                    <h2>{props.title}</h2>
                    <p>Enter News Catagory</p>
                </div>
                </div>
                
        </div>
    )
}
