import React,{useEffect, useState} from 'react'
import NewsService from '../../../pages/api/newsapi.js'
import SubmitButtonStyle from '../../atom/button/Submit/SubmitButton.module.css'
export default function NewsComp(props) {

    const [clickp,setclickp] = useState(props.count)

    useEffect(() =>{
        NewsService.updateClickCount(props.news_id,clickp)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    },[clickp])

    const updateClick = (e) =>{
        
        setclickp(clickp+1)
    
        
    }

    return (
        <div className="container">
           {props.news_title!="" ? <div><h2>{props.news_title}</h2>
        
        <h4>Click-{clickp}</h4>
        <p>{props.desc}</p>
        <p><strong>Pubished On -</strong>{new Date(props.date).toLocaleDateString()}</p>
            <a href={props.href} target="_blank"><button className={SubmitButtonStyle.submitbutton} onClick={e => { updateClick(e)}}>Visit</button></a>   
        <hr/></div>:<div></div>}
        
        </div>
    )
}
