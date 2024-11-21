const base64Img = require('base64-img');
const fs = require('fs');
const mime = require('mime-types');

exports.processFile = (file_b64) => {
    return new Promise((resolve, reject) => {
        base64Img.img(file_b64, "./uploads", Date.now(), (err, filePath) => {
            if (err) {
                reject(err);
                return;
            }
            const stats = fs.statSync(filePath);
            const mimeType = mime.lookup(filePath);
            const sizeKB = Math.round(stats.size / 1024);
            resolve({ mimeType, sizeKB });
        });
    });
};
