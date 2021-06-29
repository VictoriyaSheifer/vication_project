import axios from 'axios';
let GlobalURL = 'http://www.localhost:5000';

export function getRequest(url) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios.get(GlobalURL + url)
            resolve(res);
        } catch (err) {
            resolve("Error : ", err);
        }
    });
}


export function postRequest(url, ob) {
    return new Promise(async (resolve, reject) => {
        console.log("POST ")
        console.log("ob ",ob)
        try {
            let res = await axios.post(GlobalURL + url, ob)
            resolve(res);
        } catch (err) {
            resolve("Error : ", err);
        }
    });
}


