import React,{useEffect,useState} from 'react'
import NewsService from '../api/newsapi'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import SubmitButtonStyle from '../../comps/atom/button/Submit/SubmitButton.module.css'

export default function Agencyfeed() {

    const[cats,setcats] = useState([])
    const[agens,setagens] = useState([])
    const [feed_url,setFeedUrl] = useState("")
    const [catid,setcatid] = useState(0);
    const [ageid,setageid] = useState(0);
    const [validationError , setvalidationError] = useState("")

    useEffect(() => {
       NewsService.getCatagoryAll()
            .then((res)=>{
               return (res)
            })
            .catch(err =>{
                console.log(err)
            })
            .then((res) =>{
                if(res != undefined){
                        let cat = res.data.map(item =>{
                        return {value:item.catagory_id , display:item.catagory_title}
                    })
                    setcats([{value:'',display:'(Select your Catagory)'}].concat(cat))
                }
                
            });
            
        NewsService.getAgencyAll()
                .then((res) =>{
                    return (res)
                }) 
                .catch(err =>{
                    console.log(err)
                }) 
                .then((res) =>{
                    if(res != undefined){
                    let age = res.data.map(item =>{
                        return {value:item.agency_id,display:item.agency_name}
                    })

                    setagens([{value:'',display:'(Select your Agency)'}].concat(age))
                }
                })  
            
        return () => {
            
        }
    }, [])


    const addfeedurl = (e) => {
         e.preventDefault();
         console.log(catid)
         console.log(ageid)
         console.log(feed_url)
         NewsService.addAgencyFeed(catid,ageid,feed_url)
         .then(res =>{
             if(res.status===200){
                    store.addNotification({
                    title: 'Added',
                    message: 'Your Item has been added in the database the database',
                    insert: "top",
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                    duration: 4000
                    }
          }) 
             }
         })
         .catch(err =>{
             console.log(err)
                  store.addNotification({
                    title: 'Oops',
                    message: 'Sorry! Faced certain issue with the server,Check Inputs and Connections',
                    insert: "top",
                    type: 'warning',                         
                    container: 'top-right',                
                    animationIn: ["animated", "fadeIn"],     
                    animationOut: ["animated", "fadeOut"],   
                    dismiss: {
                    duration: 4000
                    }
          })
         })
         setageid(0)
         setcatid(0)
         setFeedUrl("")
    }

    return (
        <div className="container">
            <h1>Add AgencyFeed URL for a Particular Catagory</h1>
            <div style={{color: 'red', marginTop: '5px'}}>
                {validationError}
                </div>
            <br/> <br/>
             <form onSubmit={e =>{ addfeedurl(e)}}>
            <select value={ageid} onChange={(e) => {setageid(e.target.value), e.target.value==="" ? setvalidationError("You Must Select One Agency") : setvalidationError("")}}>
                {agens.map((agen) => <option key={agen.value} value={agen.value}>{agen.display}</option>)}
            </select>
            <br/> <br/>
            <select value={catid} onChange={(e) => {setcatid(e.target.value) , e.target.value==="" ? setvalidationError("You Must Select One Catagory") : setvalidationError("")}}>
                {cats.map((cat) => <option key={cat.value} value={cat.value}>{cat.display}</option>)}
            </select>
            <br/> <br/>
           
                <input type="text" placeholder="Add Agency URL" value={feed_url} onChange={e => {setFeedUrl(e.target.value)}} required/>
                 <br/> <br/>
                <input className={SubmitButtonStyle.submitbutton} type='submit'  value='Add URL'/>
            </form>
            
        </div>
    )
}
