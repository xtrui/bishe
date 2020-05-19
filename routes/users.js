let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')

/* GET users listing. */
router.post('/login', function (require, response) {
    htt.httpUtils.post('/api/user/login', require.body)
        .then(res => {
            if (res.data) {
                require.session.logined = 1;
                if (res.data.role) {
                    require.session.isAdmin = 1;
                }
                response.send(res.data);
            } else response.send('');
        }).catch(e => {
    });

});
router.get('/logout', (require, response) => {
    require.session.destroy(err => {

        res.redirect('/');

    })
})

router.all('/u', function (require, response, next) {
    if (require.session.logined) {
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
