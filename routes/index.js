var express = require('express');
var crypto = require('crypto');
var imageDataURI = require('image-data-uri');
var router = express.Router();
var db = require('../utils/db');
var upload = require('../utils/upload');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    var pin = db.get('pins').get(req.body.pin).value();
    if (pin === undefined) {
        res.render('index', { error: true })
    } else {
        req.session.active = true;
        // CRUD apps store session in memory.
        req.session.pin = req.body.pin;
        req.session.id = pin.id;
        req.session.signature = pin.signature;
        req.session.verfication = pin.verification;
        console.log(req.session);
        res.redirect('/step/signature');
    }
});

router.get('/step/signature', function(req, res, next) {
    res.render('sign');
});

router.post('/step/signature', function(req, res, next) {
    if (req.body.signature === undefined) {
        res.sendStatus(105);
    } else {
        try {
            var randomBytes = crypto.randomBytes(16).toString('hex');
            filePath = __basedir + '/public/data/uploads/' + randomBytes;
            req.session.signature = req.protocol + '://' + req.get('host') + '/data/uploads/' + randomBytes + '.png';
            imageDataURI.outputFile(req.body.signature, filePath);
            res.redirect('/step/verification');
        } catch (error) {
            console.log(error);
            res.sendStatus(105);
        }
    }
});

router.get('/step/verification', function(req, res, next) {
    res.render('veri');
});

router.post('/step/verification', upload.single('verification'), function(req, res, next) {
    console.log(req);
    if (!req.file) {
        res.render('veri', { error: true })
    } else {
        req.session.verification = req.protocol + '://' + req.get('host') + '/data/uploads/' + req.file.filename;
        db.get('cured').set(req.session.id, {
            signature: req.session.signature,
            verification: req.session.verification
        }).write();
        db.get('pins').unset(req.session.pin).write();
        req.session.destroy();
        res.redirect('/step/success');
    }
});

router.get('/step/success', function(req, res, next) {
    res.render('success');
});


module.exports = router;
