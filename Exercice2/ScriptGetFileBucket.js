const AWS = require('aws-sdk');
const s3 = new AWS.S3({region:'eu-west-3'});
var fs = require('fs');
var fileContent = 'Je n\'aime plus Jeff Bezos';
var params = {
 Bucket: "dfgtyhduigod",
 Key: "Test.txt",
};
s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Fichier recuperé avec succès', data);
});

params= {
    Bucket: "dfgtyhduigod",
    Key: "Test.txt",
    Body: fileContent,
}
s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Fichier téléversé avec succès', data);
   });