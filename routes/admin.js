let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')
let session = require('express-session');
const fs = require('fs')

router.all('/**', function (require, response, next) {
    if (require.session.isAdmin) {
        next();
    } else {
        response.send(403)
    }
});

router.post('/postArticle', function (require, response) {
    htt.httpUtils.post('/api/article/postArticle', require.body).then(res => {
        response.send({id: res.data});
        response.status(200);
    }).catch(error => {
        response.status(400);
        console.log(error)
    })
})

module.exports = router;

