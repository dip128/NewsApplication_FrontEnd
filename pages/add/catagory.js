import React, { useState,useEffect } from 'react'
import NewsService from '../api/newsapi'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export default function catagory() {

    const[catagory,setcatagory] = useState("")
    const[counter,setcouter] = useState(0);
    const[allcat,setallcat] = useState([]);

    useEffect(() => {
        const cat=[]
       NewsService.getCatagoryAll()
            .then((res)=>{
                res.data.map(items => {
                    cat.push(items.catagory_title)
                })
                //console.log(cat)
                setallcat(cat)
                
            })
            .catch((err)=>console.log(err))
        return () => {
            
        }
    }, [counter])


    const addCatagory =(e) =>{
        //console.log(catagory)
        setcouter(counter+1)
        e.preventDefault();
        console.log(allcat)
        if(allcat.includes(catagory)){
            console.log("Value already in the database")
              store.addNotification({
                    title: 'Check Your Input',
                    message: 'This Catagory has been already added',
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
             NewsService.addCatagory(catagory)
             .then(res =>{
                  if(res.status===200){
                
                store.addNotification({
                    title: 'Added',
                    message: 'Your Catagory has been added in the database the database',
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
       
        setcatagory("")
        
    }

    return (
        <div className="container">
            <h1>Add Catagory</h1>
             <br/> <br/>
            <form  onSubmit={e => { addCatagory(e)}}>
                <label htmlFor="text-input">Catagory -</label>
                <br/> <br/>
                <input className="input" id="text-input" type="text" placeholder="Enter Catagory" value={catagory} onChange={e => setcatagory(e.target.value)} required/>
                <br/> <br/>
                <input className="submitbutton" type='submit'  value='Add Catagory'/>
            </form>
            

        </div>
    )
}
