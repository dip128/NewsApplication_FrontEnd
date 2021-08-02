import React,{useState} from 'react'
import NewsService from '../api/newsapi'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import DeleteButtonStyle from '../../comps/atom/button/DeleteButton/DeleteButton.module.css'
import { motion } from 'framer-motion';
import { transitions } from 'react-alert';
import { spring } from 'popmotion';

const buttonVariant ={
    hidden :{
        x:"-100vw",
        opacity:0
    },
    visible:{
        x:0,
        opacity:1,
        transitions:{
            type:spring,
            delay:0.5
        }
    }
}

export default function remove() {
    
    const handleDelete = (e) => {
        console.log("Delete clicked")
        NewsService.deleteAllNews()
        .then(res =>{
            console.log(res)
            if(res.status===200){
                localStorage.removeItem('catagory_id')
                localStorage.removeItem('agency_id')
                localStorage.removeItem('heading')
                console.log("All News Deleted")
                store.addNotification({
                    title: 'Deleted',
                    message: 'All News have been Deleted from the database',
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

            else{
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

    return (
        <div className="container">
            <h1 >Delete all News</h1>
            <p>If you want to Delete all the news from the database Please enter the below buttton</p>
            <motion.button  className={DeleteButtonStyle.deletebutton} onClick={(e) => handleDelete(e)}
                variants={buttonVariant}
                initial="hidden"
                animate="visible"
            >Delete</motion.button>
            
        </div>
    )
}

