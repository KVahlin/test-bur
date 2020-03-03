const API_URL = 'http://task.skazkasoft.com/api/test-task'

import axios from 'axios'

export async function apiGet(requestPath){
    try {
        let response = await axios.get(API_URL + requestPath);
        if(response.status==200){
            return response.data
        } 
    } catch (error) {
        throw new Error(`Ошибка сервера (apiGet) ${error.message}`)
    }
}

export async function apiDelete(requestPath){
    try {
        let response = await axios.delete(API_URL + requestPath);
        if(response.status==200){
            return response.data
        } 
    } catch (error) {
        throw new Error(`Ошибка сервера (apiDelete) ${error.message}`)
    }
}

export async function apiPut(requestPath, payLoad){
    try {
        let response = await axios.put(API_URL + requestPath,payLoad);
        if(response.status==200){
            return response.data
        } 
    } catch (error) {
        throw new Error(`Ошибка сервера (apiPut) ${error.message}`)
    }
}

export async function apiPost(requestPath, payLoad){
    try {
        let response = await axios.post(API_URL + requestPath, payLoad);
        if(response.status==200){
            return response.data
        } 
    } catch (error) {
        throw new Error(`Ошибка сервера (apiPost) ${error.message}`)
    }
}

export async function getYearData(year) {
    let response = await apiGet(`?year=${year}`)
    try {
        if(response.length>0){
           return response
        } else {
            console.log(`${year} год не содержит информации в бд`)
        }
   } catch(error) {
       console.log(`Ошибка сервера (getYearData) ${error.message}`)
   }   
}

export async function removeRecord(recordId) {
    let response = await apiDelete(`/item?id=${recordId}`)
    try {
        if(response.length==0){
           return true
        } else {
            console.log(`Не удалость удалить запись`,response)
        }
   } catch(error) {
       console.log(`Ошибка сервера (removeRecord) ${error.message}`)
   }   
}

export async function updateRecord(recordId, record) {
    let response = await apiPut(`/item?id=${recordId}`, record)
    try {
        if(response.length==0){
           return true
        } else {
            console.log(`Не удалость отредактировать запись`,response)
        }
   } catch(error) {
       console.log(`Ошибка сервера (updateRecord) ${error.message}`)
   }   
}

export async function saveRecord(record) {
    let response = await apiPost(``, record)
    try {
        if(response.length>0){
           return response.data
        } else {
            console.log(`Не удалость создать запись`, response)
        }
    } catch(error) {
       console.log(`Ошибка сервера (saveRecord) ${error.message}`)
    }  
}