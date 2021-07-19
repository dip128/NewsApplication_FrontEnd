import React, { useEffect,useState } from 'react'
import NewsService from '../api/newsapi'
export default function index() {


    const[agens,setagens] = useState([])
    const [ageid,setageid] = useState(0);

    const[cats,setcats] = useState([])
    const [catid,setcatid] = useState(0);

    const [validationError , setvalidationError] = useState("")

    useEffect(() =>{
        NewsService.getAgencyAll()
        .then(res =>{
            return res;
        })
        .catch(err =>{
            console.log(err)

        })
        .then(res =>{
            if(res != undefined){
                    let age = res.data.map(item =>{
                        return {value:item.agency_id,display:item.agency_name}
                    })

                    setagens([{value:'',display:'(Select your Agency)'}].concat(age))
                }
        })

         NewsService.getCatagoryUnderAgency(ageid)
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
        return () => {
            
        }
    },[ageid])

    return (
        <div className="container">
           Search News By Agency and Catagory
           <br/><br/>
            <select value={ageid} onChange={(e) => {setageid(e.target.value), e.target.value==="" ? setvalidationError("You Must Select One Agency") : setvalidationError("")}}>
                {agens.map((agen) => <option key={agen.value} value={agen.value}>{agen.display}</option>)}
            </select>
            <br/> <br/>
            <select value={catid} onChange={(e) => {setcatid(e.target.value) , e.target.value==="" ? setvalidationError("You Must Select One Catagory") : setvalidationError("")}}>
                {cats.map((cat) => <option key={cat.value} value={cat.value}>{cat.display}</option>)}
            </select>
            <br/> <br/>
        </div>
    )
}
