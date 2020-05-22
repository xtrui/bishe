let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')

/* GET users listing. */
router.post('/login', function (require, response) {
    htt.httpUtils.post('/api/user/login', require.body)
        .then(res => {
            if (res.data) {
                require.session.logined = 1;
                response.cookie('logined', '1', {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
                if (res.data.role) {
                    require.session.isAdmin = 1;
                    response.cookie('isAdmin', '1', {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
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
    res.redirect('/');
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


module.exports = router;
