const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

let upload, s3;

s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY,
    region: 'us-east-2'
});

upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'wheels-bucket',
        acl: 'public-read-write',
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

router.get('/menuItems', (req, res, next) => {
    MenuItem.find({}).then(data => res.json(data)).catch(next);
});

router.post('/menuItems', upload.single('imagesUploader'), (req, res, next) => {

    if (req.file == null || req.file == '') {
        return res.status(400).json({ msg: 'No file uploaded' });
    } else if (!req.body.name) {
        return res.status(400).json({ msg: 'The name field is required!' });
    } else if (!req.body.dishDetails) {
        return res.status(400).json({ msg: 'The Dish Details field is required!' });
    } else if (!req.body.dishPrice) {
        return res.status(400).json({ msg: 'The Dish Price field is required!' });
    } else {

        let menuItem = { name: req.body.name, dishDetails: req.body.dishDetails, imgSrc: req.file.location, dishPrice: req.body.dishPrice };
        MenuItem.create(menuItem).then(data => res.json(data)).catch(next);
    }

});

router.delete('/menuItems/:id', (req, res, next) => {
    MenuItem.findByIdAndDelete(req.params.id).then(data => res.json(data)).catch(next);
});

router.put('/menuItems/:id', upload.single('imagesUploader'), (req, res, next) => {

    let itemDetailsFromDb = {};

    MenuItem.findById(req.params.id, function (err, result) {
        itemDetailsFromDb = result;
        console.log(itemDetailsFromDb);

        if (req.body.name) {
            itemDetailsFromDb.name = req.body.name;
        }

        if (req.body.dishDetails) {
            itemDetailsFromDb.dishDetails = req.body.dishDetails;
        }

        if (req.body.dishPrice) {
            itemDetailsFromDb.dishPrice = req.body.dishPrice;
        }

        if (req.file != null && req.file != '') {
            itemDetailsFromDb.imgSrc = req.file.location;
        }

        MenuItem.findByIdAndUpdate(req.params.id, { "name": itemDetailsFromDb.name, dishDetails: itemDetailsFromDb.dishDetails, "imgSrc": itemDetailsFromDb.imgSrc, "dishPrice": itemDetailsFromDb.dishPrice }, function (err, result) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(result);
            }
        })

    })

});

module.exports = router;