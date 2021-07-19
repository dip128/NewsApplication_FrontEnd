import axios from 'axios';
import catagory from '../add/catagory';

const NEWS_API_BASE_URL = "http://localhost:8080"


class NewsService {

    getCatagoryAll(){
        return axios.get(NEWS_API_BASE_URL+"/news/catagories/all")
    }
    addCatagory(catagory){

        return axios.post(NEWS_API_BASE_URL+"/news/add/catagory/"+catagory);

        // return axios.post(NEWS_API_BASE_URL+"/news/add/catagory/"+catagory,{},{
        // Authorization: {
        //      username: "test@gmail.com",
        //      password: "test123"
        // }
        // })
                
    }

    getAgencyAll(){
        return axios.get(NEWS_API_BASE_URL+"/news/agency/all");
    }

    addAgency(agency,link){
        return axios.post(NEWS_API_BASE_URL+"/news/add/agency/"+agency+"?logo="+link);
    }

    getNewsLink(catagoryId,agencyId){
        return axios.get(NEWS_API_BASE_URL+"/news/get?catagory_id="+catagoryId+"&agency_id="+agencyId);
    }
    getCatagoryUnderAgency(agencyId){
        return axios.get(NEWS_API_BASE_URL+"/news/get/catagory?agency_id="+agencyId);
    }
    addAgencyFeed(catagoryId,agencyId,feed_url){
        return axios.post(NEWS_API_BASE_URL+"/news/add/agencyfeed?catagory_id="+catagoryId+"&agency_id="+agencyId+"&feed_url="+feed_url);
    }

    addNews(catagoryId,agencyId,newsDate,newsDesc,newsTitle,newsLink){
        return axios.post(NEWS_API_BASE_URL+"/news/post/?catagory_id="+catagoryId+"&agency_id="+agencyId+"&news_date="+newsDate+"&news_desc="+newsDesc+"&news_title="+newsTitle+"&news_link="+newsLink)
    }

    deleteAllNews(){
        return axios.delete(NEWS_API_BASE_URL+"/news/delete/all")
    }

}

export default new NewsService();