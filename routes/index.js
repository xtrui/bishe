let express = require('express');
let router = express.Router();
// let hhh = require("../utils/test");

let axios = require('axios');
let h2 = require('../utils/httpUtils')

// const axiosDefualtConfig = {
//     baseURL: 'http://localhost:8080',
//     timeout: 5000,
//     headers: {'X-Custom-Header': 'foobar'}
// };
// const hhh = axios.create(axiosDefualtConfig);


/* GET home page. */
router.get('/getName', function (req, res) {
    // res.render('index', {title: 'Express'});
    h2.httpUtils.get("/test").then(res => {
        console.log(res.status);
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });
    res.send("给你一篇文章好吧")
});

module.exports = router;
