let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')

/* GET users listing. */
router.post('/login', function (require, response) {
    htt.httpUtils.post('/api/user/login', require.body)
        .then(res => {
            if (res.data) {
                require.session.logined = 1;
                require.session.userId = res.data.id;
                // response.cookie('logined', '1', {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
                if (res.data.role) {
                    require.session.isAdmin = 1;
                    // response.cookie('isAdmin', '1', {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
                }
                response.send(res.data);
            } else response.send('');
        }).catch(e => {
    });

});
router.get('/logout', (require, response) => {
    require.session.destroy(err => {
    })
    response.clearCookie('isAdmin');
    response.clearCookie('logined');

    response.redirect('/');
})

//获取博客设置信息
router.get('/getSetting', (require, response) => {
    htt.httpUtils.get('/api/setting/get')
        .then(res => {
            if (res.status === 200) {
                // console.log(res.data);
                response.send(res.data);
            } else response.send(false);
        }).catch(e => {
        response.send({status: 600})
    });
})

router.get('/getCode', (require, response) => {
    htt.httpUtils.get('/api/user/getCode', {params: {email: require.query.email}})
        .then(res => {
            if (res.status === 200) {
                // console.log(res.data);
                require.session.code = res.data.code;
                require.session.email = res.data.email;
                response.send({code: 200});
            } else response.send({status: 600, message: res.data.message});
        }).catch(e => {
        response.send({status: 600})
    });
})

router.post('/register', (require, response) => {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let email = require.body.email;
    if (email === '' || !reg.test(email)) {
        //邮箱格式不正确
        response.send({status: 600, message: "邮箱格式不正确"})
    }
    //验证验证码
    if (require.session.code === require.body.code && require.session.email === require.body.email) {
        htt.httpUtils.post('/api/user/register', require.body)//发送注册
            .then(res => {
                console.log(res.data);
                if (res.data.code === 200) {  //
                    //如果用户名不重复，邮箱不重复
                    delete require.session.code;
                    delete require.session.email;
                }
                response.send(res.data)
            }).catch(e => {
            response.send({code: '600', message: '服务器响应失败'})
        });

    }
})

router.all('/u', function (require, response, next) {
    if (require.session.logined || require.cookies.logined) {
        next();
    } else {
        response.send(403);
    }
})

router.post('/u/postComment', function (require, response) {
    htt.httpUtils.post('/api/comment/postComment', require.body)
        .then(res => {
            console.log(res.data);
            response.send(res.data ? 200 : 400);
        }).catch(e => {
        console.log(e);
        response.send(400);
    });
})

//获取用户评论评论
router.get('/u/getCommentByPage', function (require, response) {
    htt.httpUtils.get('/api/comment/getUserComment', {
        params: {
            page: require.query.page,
            userId: require.session.userId
        }
    }).then(res => {
        response.send(res.data);
        response.status(200);
    }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

//收藏文章
router.post('/u/addCollection', function (require, response) {
    htt.httpUtils.post('/api/collection/addFavorite', require.body)
        .then(res => {
            response.send(res.data);
        }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

//取消收藏文章
router.post('/u/cancelCollection', function (require, response) {
    htt.httpUtils.post('/api/collection/cancel', require.body)
        .then(res => {
            response.send(res.data);
        }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

//判断当前文章是不是已经收藏
router.get('/u/getIsFavorite', function (require, response) {
    htt.httpUtils.get('/api/collection/isFavorite', {
        params: {
            articleId: require.query.articleId,
            userId: require.query.userId
        }
    })
        .then(res => {
            response.send(res.data);
        }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})

//获取收藏文章
router.get('/u/getFavoriteByPage', function (require, response) {
    htt.httpUtils.get('/api/collection/getUserFavoriteByPage', {
        params: {
            page: require.query.page,
            userId: require.query.userId
        }
    })
        .then(res => {
            response.send(res.data);
        }).catch(error => {
        response.sendStatus(400);
        console.log(error);
    })
})


module.exports = router;
