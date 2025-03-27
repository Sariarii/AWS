var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
var ddb = new AWS.DynamoDB.DocumentClient();

async function GetEleve(id) {
    var params ={
        TableName :'ESTIAMNTAWSE4',
        Key: {
            'id': id
        }
    };
ddb.get(params,function(err,data){
    if (err) {
        console.error("Erreur lors de la récupération element : ",JSON.stringify(err,null,2));
    } else {
        console.log("Données : ",data.item);
    }
});
}

module.exports={GetEleve}
