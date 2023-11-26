import axios from "axios";
import { apiUrl } from "./constants";

export const getDataApi = async (url, params) =>{
    const res = await axios(`${apiUrl}${url}`, {params});
    //const res = await axios.get(`${apiUrl}${url}`, param);
    
    return res;
};

export const postDataApi = async (url, data) =>{
    const res = await axios.post(`${apiUrl}${url}`, data);
    return res;
};

export const postAdminDataApi = async (url, token, data) =>{
    const res = await axios.post(`${apiUrl}${url}`, data, 
    {headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }   
    });
    return res;
};

export const getTokenDataApi = async (url, token ) =>{
    const res = await axios.get(`${apiUrl}${url}`, 
    {headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }   
    });
    return res;
};


export const putDataApi = async (url, data) =>{
    const res = await axios.put(`${apiUrl}${url}`, data);
    return res;
};

export const deleteDataApi = async (url, data) =>{
    const res = await axios.delete(`${apiUrl}${url}`, data);
    return res;
};


export const patchDataApi = async (url, data) => {
    const res = await axios.patch(`${apiUrl}${url}`, data);
    return res;
};

export const putAdminDataApi = async (url, token, data) =>{
    const res = await axios.put(`${apiUrl}${url}`, data, 
    {headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }   
    });
    return res;
};

export const deleteAdminDataApi = async (url, id, token) =>{
    const res = await axios.delete(`${apiUrl}${url}/${id}`, 
    {headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
        }   
    });
    return res;
};
