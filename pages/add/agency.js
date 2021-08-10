import React, { useState,useEffect } from 'react'
import NewsService from '../api/newsapi'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import SubmitButtonStyle from '../../comps/atom/button/Submit/SubmitButton.module.css'


export default function Agency() {

    const[agency,setagency] = useState("")
    const[counter,setcouter] = useState(0);
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
    }, [counter])


    const addAgency =(e) =>{
        console.log(agency)
        setcouter(counter+1)
        e.preventDefault();
        console.log(allage)
        if(allage.includes(agency)){
            console.log("Value already in the database")
              store.addNotification({
                    title: 'Check Your Input',
                    message: 'This Agency has been already added',
                    insert: "top",
                    type: 'default',                         
                    container: 'top-right',                
                    animationIn: ["animated", "fadeIn"],     
                    animationOut: ["animated", "fadeOut"],   
                    dismiss: {
                    duration: 4000
                    }
          })
        }
        else{
             NewsService.addAgency(agency,agencyUrl)
               .then(res =>{
                  if(res.status===200){
                
                store.addNotification({
                    title: 'Added',
                    message: 'Your Agency has been added in the database',
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
                    message: 'Sorry! Faced certain issue with the server',
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
        }
       
        setagency("")
        setagencyUrl("")
        
    }

    return (
        <div className="container">
            <h1>Add Agency</h1>
            <br/> <br/>
            <form onSubmit={e => { addAgency(e)}}>
                <input type="text" placeholder="Enter Agency Name" value={agency} onChange={e => setagency(e.target.value)} required/>
                 <br/> <br/>
                 <input type="text" placeholder="Enter logo image URL" value={agencyUrl} onChange={e => setagencyUrl(e.target.value)} required/>
                 <br/> <br/>
                <input className={SubmitButtonStyle.submitbutton} type='submit'  value='Add Agency'/>
            </form>
            

        </div>
    )
}
