var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
var ddb = new AWS.DynamoDB.DocumentClient();

async function UpdateEleve(id,newName,newAge,newClass) {
var params ={
    TableName :'ESTIAMNTAWSE4',
    Key: {
        'id':id
    },
    UpdateExpression:'set nom = :nom ,age= :age,  classe= :classe',
    ExpressionAttributeValues:{
        ':nom' : newName,
        ':age' : newAge,
        ':classe' : newClass
    }
}
ddb.update(params,function(err,data){
    if (err) {
        console.error("Erreur lors de la maj des elements: ",JSON.stringify(err,null,2));
    } else {
        console.log("Element mis a jour avec succès");
    }
});
}

module.exports={UpdateEleve}