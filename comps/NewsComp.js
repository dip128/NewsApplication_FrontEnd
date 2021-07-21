import React,{useState} from 'react'
import NewsService from '../pages/api/newsapi'

export default function NewsComp(props) {

    const [clickp,setclickp] = useState(0)

    const updateClick = (e) =>{
        
        setclickp(clickp+1)
        NewsService.updateClickCount(props.news_id,clickp)
    }

    return (
        <div className="container">
           {props.news_title!="" ? <div><h2>{props.news_title}</h2>
        
        <h4>Click-{clickp}</h4>
        <p>{props.desc}</p>
        <p><h5>Published On -</h5>{new Date(props.date).toLocaleDateString()}</p>
            <a href={props.href} target="_blank"><button className="submitbutton" onClick={e => { updateClick(e)}}>Visit</button></a>   
        <hr/></div>:<div></div>}
        
        </div>
    )
}
