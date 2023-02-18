import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
    baseURL: `https://welbi.org/api/`
  });
const token = Cookies.get('token')
  let options = {
    headers: {
      Authorization: 'Bearer '+token
    }
  };

export const getAuthToken = (payload:any): Promise<any> => {
    return API.post(`start`,payload)
}

export const getResidents = (): Promise<any> => {
  return API.get(`residents`,options)
}
export const getPrograms = (): Promise<any> => {
  return API.get(`programs`,options)
}