import React, { useState,useEffect } from 'react'
import NewsService from '../api/newsapi'

export default function agency() {

    const[agency,setagency] = useState("")
    const[agechange,setagechange] = useState("")
    const[agencyUrl,setagencyUrl] = useState("")
    const[allage,setallage] = useState([]);

    useEffect(() => {
        const age=[]
       NewsService.getAgencyAll()
            .then((res)=>{
                res.data.map(items => {
                    age.push(items.agency_name)
                })
                console.log(age)
                setallage(age)
            })
            .catch((err)=>console.log(err))
        return () => {
            
        }
    }, [agechange])


    const addAgency =(e) =>{
        console.log(agency)
        setagechange(agency)
        e.preventDefault();
        console.log(allage)
        if(allage.includes(agency)){
            console.log("Value already in the database")
        }
        else{
             NewsService.addAgency(agency,agencyUrl)
        }
       
        setagency("")
        setagencyUrl("")
    }

    return (
        <div className="container">
           
            Add Agency
            <br/> <br/>
            <form onSubmit={e => { addAgency(e)}}>
                <input type="text" placeholder="Enter Agency Name" value={agency} onChange={e => setagency(e.target.value)} required/>
                 <br/> <br/>
                 <input type="text" placeholder="Enter logo image URL" value={agencyUrl} onChange={e => setagencyUrl(e.target.value)} required/>
                 <br/> <br/>
                <input type='submit'  value='Add Agency'/>
            </form>
            

        </div>
    )
}
