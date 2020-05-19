let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')
let axios = require("axios")
const FormData = require("form-data")
const multipart = require('connect-multiparty');
const fs = require('fs')
let multipartMiddleware = multipart()

router.all('/**', function (require, response, next) {
    if (require.session.isAdmin || require.cookies.isAdmin) {
        next();
    } else {
        response.status('403');
    }
});
router.post('/images/up', multipartMiddleware, function (req, response) {
    console.log(req.files.image);
    const path = req.files.image.path;
    // const newPath = path.join(path.dirname(path), originalFilename)


    const file = fs.createReadStream(path);

    let form = new FormData();
    form.append('file', file);
    htt.httpUtils.post("/api/file/upFile", file)
        .then(res => {
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });


    // }
    // });
    response.send("");
});

module.exports = router;

