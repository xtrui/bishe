let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')
router.get('/detail/:id', function (req, response) {
    htt.httpUtils.get("/api/article/detail", {params: {id: req.params.id}})
        .then(res => {
            response.status(200);
            response.send(res.data);
        })
        .catch(err => {
            response.status(400);
            console.log(err);
        });
});

router.post('/postArticle', function (require, response) {
    console.log(require.body);
    htt.httpUtils.post('/api/article/postArticle', require.body).then(res => {
        console.log(res.data)
        response.send({id: res.data});
        response.status(200);
    }).catch(error => {
        response.status(400);
        console.log(error)
    })
})

router.get('/page/:page', function (req, response) {
    console.log(req.params.page, req.query);

    htt.httpUtils.get("/api/article/getArticleListByPage", {params: {page: req.params.page}})
        .then(res => {
            response.status(200);
            response.send(res.data);
        })
        .catch(err => {
            response.status(400);
            console.log(err);
        });
});

//搜索文章
router.get('/search', function (require, response) {
    let page = require.query.page;
    let key = require.query.key;
    htt.httpUtils.get('/api/article/searchArticle', {params: {key: key, page: page}})
        .then(res => {
            console.log(res.data)
            response.send(res.data);
        }).catch(err => {
        console.log(err);
    })
})


//下面是目录相关

router.get('/category/All', function (require, response) {
    htt.httpUtils.get('/api/category/All').then(res => {
        // console.log(res.data);
        response.send(res.data);
        response.status(200);
    }).catch(error => {
        response.status(400);
        console.log(error)
    })
})

//获取分类分页文章
router.get('/category/ArticleByPage', function (require, response) {
    let categoryId = require.query.categoryId;
    let page = require.query.page;
    htt.httpUtils.get('/api/category/getCategoryArticleByPage', {
        params: {
            categoryId: categoryId,
            page: page
        }
    }).then(res => {
        // console.log(res.data);
        response.send(res.data);
        response.status(200);
    }).catch(error => {
        response.status(400);
        console.log(error)
    })
})
//获取分类文章分页总数
router.get('/category/ArticleTotalPage', function (require, response) {
    let categoryId = require.query.categoryId;
    htt.httpUtils.get('/api/category/getTotalPageById', {params: {id: categoryId}}).then(res => {
        response.send(res.data);
        response.status(200);
    }).catch(error => {
        response.status(400);
        console.log(error)
    })
})

module.exports = router;

