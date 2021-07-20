
import React, { useEffect,useState } from 'react'
import NewsService from '../api/newsapi'
import convert from 'xml-js'


export default function index() {

    
    const[rss,setrss] = useState(" ")

    const[heading,setheading] = useState("")
    const[newsarr,setnewsarr] = useState([])

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
                    }
                    // if(t!= undefined && d!=undefined && l!= undefined)
                       
                })
                
                
                
            })
            .catch(err => console.log(err));
             
         })
         .catch(err =>{
             console.log(err)
         })
         
         console.log(rss)
         setageid(0)
         setcatid(0)
    }

    return (
        <div className="container">
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
                <input className="submitbutton" type='submit'  value='Search'/>
            </form> : <h1>{heading}</h1>}

        </div>
    )
}
