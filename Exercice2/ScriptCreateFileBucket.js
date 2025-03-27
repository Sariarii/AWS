const AWS = require('aws-sdk');
const s3 = new AWS.S3({region:'eu-west-3'});
var fs = require('fs');
var fileContent = fs.readFileSync('Test.txt');
var params = {
 Bucket: "dfgtyhduigod",
 Key: "Test.txt",
 Body: fileContent
};
s3.putObject(params, function(err, data) {
 if (err) console.log(err, err.stack);
 else console.log('Fichier téléversé avec succès', data);
});

   