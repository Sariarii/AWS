// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "eu-west-3" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName :'ESTIAMNTAWSE4',
    Item : {
        'id' : 1,
        'nom': "Alice", 
        'age': 12, 
        'classe': "6ème"
    }
};

ddb.put(params,function(err,data){
    if (err) {
        console.error("Erreur lors de l'ajout element : ",JSON.stringify(err,null,2));
    } else {
        console.log("Element ajouté avec succès");
    }
});