import React, { useEffect,useRef } from 'react'
import { useState } from 'react'
import NewsService from '../api/newsapi'
import ReactToPrint from 'react-to-print';

export default function index() {

  const componentRef = useRef();

    const[report,setreport] = useState([])

    useEffect(() =>{
        NewsService.getNewsReport()
        .then((res) =>{
            let arr = res.data.map((item) =>{
                return {news_id:item.news_id,agency_id:item.agency_id,news_title:item.news_title,click_count:item.click_count}
            })

            setreport([{agency_id:'',news_title:'',click_count:''}].concat(arr))
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    return (
        <div className="container">

           <ReactToPrint
                trigger={() => <button className="submitbutton container" style={{marginBottom:'25px',float:'right'}}>Print this out!</button>}
                content={() => componentRef.current}
            />

            <table style={{border: '1px solid #ddd',padding: '8px',width: '100%'}} ref={componentRef} >
                <thead>
            <tr style={{textAlign:'center',border: '1px solid #ddd',padding: '8px',width: '100%'}}>
                <td>Agency Id</td>
                <td>News Title</td>
                <td>Click Count</td>
            </tr>
            </thead>

                    {report.map((item) => {
                        if(item.news_title!=''){
                            return (
                                <tbody>
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
        </div>
    )
}
