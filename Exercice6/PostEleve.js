const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
exports.handler = async (event) => {
    let body;
    body=JSON.parse(event.body)
    const id = body.id
    const nom= body.nom
    const age = body.age
    const classe = body.classe
    const params = {
        TableName: "ESTIAMNTAWSE4",
        Item : {
            id : id,
            nom: nom, 
            age: age, 
            classe: classe
        }
    };
 
    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Élément ajouté avec succès", id: id }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur lors de l'insertion", details: err }),
        };
    }
};