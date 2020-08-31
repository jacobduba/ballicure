var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
    destination: './public/data/uploads',
    filename: function(req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        })
    }
})

module.exports = multer({ storage: storage });
