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

module.exports = router;

