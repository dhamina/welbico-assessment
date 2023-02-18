import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
    baseURL: `https://welbi.org/api/`
  });
const token = Cookies.get('token')
const options =(token:string)=>{
 return(
  {
    headers: {
      Authorization: 'Bearer '+token
    }
  }
 )
}


export const getAuthToken = (payload:any): Promise<any> => {
    return API.post(`start`,payload)
}

export const getResidents = (token:string): Promise<any> => {
  return API.get(`residents`,(options(token)))
}
export const getPrograms = (token:string): Promise<any> => {
  return API.get(`programs`,(options(token)))
}