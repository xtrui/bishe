let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')
let session = require('express-session');
const fs = require('fs')

router.all('/**', function (require, response, next) {
    if (require.session.isAdmin || require.cookies.isAdmin) {
        next();
    } else {
        res.sendStatus(403);
    }
});

//文章相关
router.post('/postArticle', function (require, response) {
    htt.httpUtils.post('/api/article/postArticle', require.body).then(res => {
        response.send({id: res.data});
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

router.post('/updateArticle', function (require, response) {
    htt.httpUtils.post('/api/article/updateArticle', require.body).then(res => {
        response.send({id: res.data});
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

router.post('/deleteArticle', function (require, response) {
    htt.httpUtils.post('/api/article/deleteArticleByIds', require.body).then(res => {
        response.send({status: res.data});
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

//评论相关

router.get('/getCommentByPage', function (require, response) {
    htt.httpUtils.get('/api/comment/getAllComment', {params: {page: require.query.page}}).then(res => {
        response.send(res.data);
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})


router.post('/deleteComment', function (require, response) {
    htt.httpUtils.post('/api/comment/deleteCommentByIds', require.body).then(res => {
        response.send({status: res.data});
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

router.post('/publicComment', function (require, response) {
    htt.httpUtils.post('/api/comment/publicComment', require.body).then(res => {
        response.send({status: res.data});
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})


module.exports = router;

