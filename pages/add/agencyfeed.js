import React,{useEffect,useState} from 'react'
import NewsService from '../api/newsapi'

export default function agencyfeed() {

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
                let cat = res.data.map(item =>{
                    return {value:item.catagory_id , display:item.catagory_title}
                })
                setcats([{value:'',display:'(Select your Catagory)'}].concat(cat))
            });
            
        NewsService.getAgencyAll()
                .then((res) =>{
                    return (res)
                }) 
                .catch(err =>{
                    console.log(err)
                }) 
                .then((res) =>{
                    let age = res.data.map(item =>{
                        return {value:item.agency_id,display:item.agency_name}
                    })

                    setagens([{value:'',display:'(Select your Agency)'}].concat(age))
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
         setageid(0)
         setcatid(0)
         setFeedUrl("")
    }

    return (
        <div className="container">
            Add AgencyFeed URL for a Particular Catagory
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
                <input className="submitbutton" type='submit'  value='Add URL'/>
            </form>
            
        </div>
    )
}
