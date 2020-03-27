import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/'

const APIService = {
    post: function(route, params) {
        return new Promise((resolve, reject) =>{
            const url = BASE_URL + route;
            //print("POST REQUEST: " + url)
            axios.post(url, params).then(res => {
                resolve(res)
            }, err =>{
                reject(err)
            })
        })
    },

    get: function(route, params) {
        return new Promise((resolve, reject) =>{
            const url = BASE_URL + route;
            //print("GET REQUEST: " + url)
            axios.get(url, {params: params}).then(res => {
                resolve(res)
            }, err =>{
                reject(err)
            })
        })
    },

    put: function(route, params) {
        return new Promise((resolve, reject) =>{
            const url = BASE_URL + route;
            //print("PUT REQUEST: " + url)
            axios.put(url, params).then(res => {
                resolve(res)
            }, err =>{
                reject(err)
            })
        })
    },
};

export default APIService;