let express = require('express');
let router = express.Router();
let htt = require('../utils/httpUtils')
let axios = require("axios")
let path = require('path');
const FormData = require("form-data")
const multipart = require('connect-multiparty');
const fs = require('fs')
let UUID = require('uuid');
let multipartMiddleware = multipart()

router.all('/**', function (require, response, next) {
    if (require.session.isAdmin || require.cookies.isAdmin) {
        next();
    } else {
        next()
        // response.sendStatus(403);
    }
});
router.post('/images/up', multipartMiddleware, function (req, response) {
    console.log(req.files.image);
    const filePath = req.files.image.path;
    let originalFileName = req.files.image.originalFilename;
    const newPath = path.join(__dirname, "../public/upload")
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
    }
    const uuid = UUID.v1();
    let dest = newPath + "/" + uuid + originalFileName
    fs.copyFile(filePath, dest, err => {
    });
    console.log(__dirname);
    console.log(path)
    // 删除文件
    fs.unlinkSync(filePath);


    // let form = new FormData();
    // form.append('file', file);
    // htt.httpUtils.post("/api/file/upFile", form,{ headers: {'Content-Type': 'multipart/form-data'}})
    //     .then(res => {
    //         // console.log(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    //
    //
    // // }
    // // });
    response.send("/upload/" + uuid + originalFileName);
});

router.post('/video/up', multipartMiddleware, function (req, response) {
    const filePath = req.files.file.path;
    let originalFileName = req.files.file.originalFilename;
    const newPath = path.join(__dirname, "../public/video")
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
    }
    const uuid = UUID.v1();
    let dest = newPath + "/" + uuid + originalFileName
    fs.copyFile(filePath, dest, err => {
    });
    console.log(__dirname);
    console.log(path)
    // 删除临时文件
    fs.unlinkSync(filePath);

    response.send("/video/" + uuid + originalFileName);
});

module.exports = router;

