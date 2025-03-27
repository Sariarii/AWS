const AWS = require('aws-sdk');
const s3 = new AWS.S3({region:'eu-west-3'});
s3.createBucket({ Bucket: "dfgtyhduigod" }, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket créé avec succès', data);
});
