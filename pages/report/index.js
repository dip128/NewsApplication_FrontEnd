import React, { useEffect,useRef } from 'react'
import { useState } from 'react'
import NewsService from '../api/newsapi'
import ReactToPrint from 'react-to-print';
import { motion } from 'framer-motion';
import SubmitButtonStyle from '../../comps/atom/button/Submit/SubmitButton.module.css'

const postVariants = {
    initial: { scale: 0, x: 100, opacity: 0 },
    enter: { scale: 1, x: 1, opacity: 1, transition: { duration: 0.7, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0,
      x: -1000,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    }
  };

export default function Index() {

  const componentRef = useRef();

    const[report,setreport] = useState([])

    useEffect(() =>{
        NewsService.getNewsReport()
        .then((res) =>{
            let arr = res.data.map((item) =>{
                return {news_id:item.news_id,agency_id:item.agency_id,news_title:item.news_title,click_count:item.click_count}
            })

            setreport([{news_id:'',agency_id:'',news_title:'',click_count:''}].concat(arr))
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    const getAgencyName = (id) => {
        NewsService.getAgencyById(id)
        .then((res) =>   {
            return (res.data.agency_name)
        })
       
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <motion.div className="container" variants={postVariants} initial='initial' animate='enter' exit='exit'>

           <ReactToPrint
                trigger={() => <button className={SubmitButtonStyle.submitbutton} style={{float:'right' ,margin:'10px'}}>Print The Report</button> }
                content={() => componentRef.current}
            />

            <table style={{border: '1px solid #ddd',padding: '8px',width: '100%'}} ref={componentRef} >
                <thead style={{background:'white'}}>
            <tr style={{textAlign:'center',border: '1px solid #ddd',padding: '8px',width: '100%'}}>
                <td>Agency Id</td>
                <td>News Title</td>
                <td>Click Count</td>
            </tr>
            </thead>

                    {report.map((item) => {
                       
                        if(item.news_title!=''){
                            
                            return (
                                <tbody key={item.news_id}>
                                <tr style={{textAlign:'center',border: '1px solid #ddd',padding: '8px',width: '100%'}} key={item.news_id}>
                                    
                                    <td>{item.agency_id}</td>
                                    <td>{item.news_title}</td>
                                    <td>{item.click_count}</td>
                                    </tr>
                                 
                                  </tbody>
                            )
                        }
            })}
             </table>    
        </motion.div>
    )
}
