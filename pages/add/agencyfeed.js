import React,{useEffect,useState} from 'react'

export default function agencyfeed() {

    const[cats,setcats] = useState([])
    const[agencys,setagencys] = useState([])
    const [feed_url,setFeedUrl] = useState("")
    const [catid,setcatid] = useState(0);
    const [ageid,setageid] = useState(0);

    return (
        <div className="container">
            Add AgencyFeed URL for a Particular Catagory
            <br/> <br/>
            <select>
                
            </select>
            <form onSubmit={e =>{ addfeedurl(e)}}>
                <input type="text" placeholder="Add Agency URL" value={feed_url} onChange={e => {setFeedUrl(e.target.value)}} required/>
                 <br/> <br/>
                <input type='submit'  value='Add URL'/>
            </form>
            
        </div>
    )
}
