let axios = require('axios');

const axiosDefualtConfig = {
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
};
const http = axios.create(axiosDefualtConfig);

// http.get("/test").then(res =>{
//     console.log(res.status);
//     console.log(res.data);
// }).catch(err=>{
//     console.log(err);
// });

// class  httpUtils{
//     get(url,params){
//         return http.get(url,{params});
//     }
//
//     post(url,param){
//         return http.get(url,param)
//     }
// }

exports.httpUtils = http;
