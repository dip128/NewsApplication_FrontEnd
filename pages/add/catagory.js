import React, { useState,useEffect } from 'react'
import NavbarComps from '../../comps/Navbar'
import NewsService from '../api/newsapi'

export default function catagory() {

    const[catagory,setcatagory] = useState("")
    const[catchange,setcatchange] = useState("")
    const[allcat,setallcat] = useState([]);

    useEffect(() => {
        const cat=[]
       NewsService.getCatagoryAll()
            .then((res)=>{
                res.data.map(items => {
                    cat.push(items.catagory_title)
                })
                console.log(cat)
                setallcat(cat)
            })
            .catch((err)=>console.log(err))
        return () => {
            
        }
    }, [catchange])


    const addCatagory =(e) =>{
        console.log(catagory)
        setcatchange(catagory)
        e.preventDefault();
        console.log(allcat)
        if(allcat.includes(catagory)){
            console.log("Value already in the database")
        }
        else{
             NewsService.addCatagory(catagory)
        }
       
        setcatagory("")
    }

    return (
        <div className="container">
            Add Catagory
             <br/> <br/>
            <form  onSubmit={e => { addCatagory(e)}}>
                <input type="text" placeholder="Enter Catagory" value={catagory} onChange={e => setcatagory(e.target.value)} required/>
                <br/> <br/>
                <input type='submit'  value='Add Catagory'/>
            </form>
            

        </div>
    )
}
