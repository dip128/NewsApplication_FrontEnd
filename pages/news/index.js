
import React, { useEffect,useState } from 'react'
import NewsService from '../api/newsapi'
import convert from 'xml-js'
import NewsComp from '../../comps/molecule/NewsComp/NewsComp.js';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { motion } from 'framer-motion';
import SubmitButtonStyle from '../../comps/atom/button/Submit/SubmitButton.module.css'
import useLocalStorage from '../../customHooks/useLocalStorage';

const postVariants = {
    initial: { scale: 0, x: -1000, opacity: 0 },
    enter: { scale: 1, x: 1, opacity: 1, transition: { duration: 0.7, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0,
      x: -1000,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    }
  };

export default function Index() {

    const[heading,setheading]=useLocalStorage('heading',"")

    
    const[rss,setrss] = useState("")

    //const[heading,setheading] = useState("")
    const[newsarr,setnewsarr] = useState([])
    const[newscatid,setnewscatid] = useState(0)
    const[newsageid,setnewsageid] = useState(0)

    const[newstitle,setnewstitle] = useState("")
    const[newsdesc,setnewsdesc] = useState("")
    const[newsdate,setnewsdate] = useState(new Date().toLocaleDateString())
    const[newslink,setnewslink] = useState("")

    const[agens,setagens] = useState([])
    const [ageid,setageid] = useState(0);

    const[cats,setcats] = useState([])
    const [catid,setcatid] = useState(0);

    const [validationError , setvalidationError] = useState("")

    useEffect(() =>{
        if(heading!=null || heading !=""){
            setheading(heading)
        }
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


    const searchNews = (e) =>{

         e.preventDefault();
         
         NewsService.getNewsLink(catid,ageid)
         .then(res =>{
            // console.log(res.data)  
            // var temp = res.data
            //  setrss(temp)
            fetch("https://cors-anywhere.herokuapp.com/"+res.data)
            .then(res => res.text())
            .then(data => {
                // let parser = new DOMParser()
                // let xmldoc=parser.parseFromString(data,'text/xml')
                // console.log(xmldoc)
                var js=convert.xml2json(data, {compact: false, spaces: 4})
                var obj=JSON.parse(js)
                var t,des,l
                obj.elements[0].elements[0].elements.map(item =>{
                    if(item.name==='title'){
                        
                        setheading(item.elements[0].text)
                        //localStorage.setItem('heading',item.elements[0].text)
                        localStorage.setItem('catagory_id',catid)
                        localStorage.setItem('agency_id',ageid)
                    }
                    if(item.name==='item'){
                        item.elements.map((i)=>{

                           

                            if(i.name==='title'){
                                t=i.elements[0].cdata
                                //console.log(newstitle)
                            }
                            if(i.name==='description'){
                                des=i.elements[0].cdata
                                //console.log(newsdesc)
                            }
                            if(i.name==='link'){
                               l=i.elements[0].cdata
                                //console.log(newslink)
                            }
                            if(i.name==='pubDate'){
                                var d = i.elements[0].cdata;
                               // console.log(new Date(d).toLocaleDateString())
                                
                                setnewsdate(new Date(d).toLocaleDateString())
                                console.log(newsdate)
                            }
                        })
                         NewsService.addNews(catid,ageid,newsdate,des,t,l)
                         .then((res) =>{

                            if(res.status===200){
                                store.addNotification({
                                    title: 'Added',
                                    message: 'New News has been added in the database',
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
                    
                       
                })
                
                
                
            })
            .catch(err => console.log(err));
             
         })
         .catch(err =>{
             console.log(err)
         })
         

        setnewsageid(ageid)
        setnewscatid(catid)

        
         setageid(0)
         setcatid(0)
    }

    const changecatagory = (e) =>{
        localStorage.removeItem('heading')
        localStorage.removeItem('catagory_id')
        localStorage.removeItem('agency_id')
       window.location.reload(false)
    }

    const seeNews = (e) =>{
        if(localStorage.getItem('catagory_id')!=null && localStorage.getItem('agency_id')!=null){
                NewsService.getNewsByAgencyandCatagory(localStorage.getItem('catagory_id'),localStorage.getItem('agency_id'))
                .then(res => {
                    return res;
                    console.log(res)
                })
                .catch(err =>{
                    console.log(err)
                })

                .then((res) =>{
                    //console.log(res.data)  
                    let news = res.data.map((item) =>{
                        return {news_id : item.news_id, news_title:item.news_title, news_desc:item.news_desc, news_date:item.news_date, news_link:item.news_link, click_count:item.click_count}
                    })
                    //console.log(news)
                    setnewsarr([{news_id:'',news_title:'',news_desc:'',news_date:'',news_link:'',click_count:''}].concat(news))
                    
                })
        }
        else
        {NewsService.getNewsByAgencyandCatagory(newscatid,newsageid)
        .then(res => {
            return res;
        })
        .catch(err =>{
            console.log(err)
        })

        .then((res) =>{
            //console.log(res.data)  
            let news = res.data.map((item) =>{
                return {news_id : item.news_id, news_title:item.news_title, news_desc:item.news_desc, news_date:item.news_date, news_link:item.news_link, click_count:item.click_count}
            })
            //console.log(news)
            setnewsarr([{news_id:'',news_title:'',news_desc:'',news_date:'',news_link:'',click_count:''}].concat(news))
             
        })}

        
    }

    return (
        <motion.div className="container" variants={postVariants} initial='initial' animate='enter' exit='exit'>
           Search News By Agency and Catagory
           <br/><br/>
           <div style={{color: 'red', marginTop: '5px'}}>
                {validationError}
            </div>
            <br/> <br/>
            {heading==="" ? <form onSubmit={e =>{ searchNews(e)}}>
            <select value={ageid} onChange={(e) => {setageid(e.target.value), e.target.value==="" ? setvalidationError("You Must Select One Agency") : setvalidationError("")}}>
                {agens.map((agen) => <option key={agen.value} value={agen.value}>{agen.display}</option>)}
            </select>
            <br/> <br/>
            <select value={catid} onChange={(e) => {setcatid(e.target.value) , e.target.value==="" ? setvalidationError("You Must Select One Catagory") : setvalidationError("")}}>
                {cats.map((cat) => <option key={cat.value} value={cat.value}>{cat.display}</option>)}
            </select>
            <br/> <br/>
             <br/> <br/>
                <input className={SubmitButtonStyle.submitbutton} type='submit'  value='Search'/>
            </form> : <div><h1>{heading}</h1><button className={SubmitButtonStyle.submitbutton} onClick={e => { seeNews(e)}}>See the news</button>
                <button className={SubmitButtonStyle.submitbutton} style={{marginLeft:'25px'}} onClick={e => { changecatagory(e)}}>Change Catagory</button>
            </div>}
            {newsarr.length>0 ? <div>{newsarr.map((item) =>(
                <NewsComp key={item.news_id} news_id={item.news_id} news_title={item.news_title} href={item.news_link} count={item.click_count} desc={item.news_desc} date={item.news_date}/>
            ))}</div>:<div></div>}
        </motion.div>
    )
}
