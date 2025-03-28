const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
exports.handler = async (event) => {
    let response;
    const params = {
        TableName: "ESTIAMNTAWSE4",
    };
 
    if (event.queryStringParameters && event.queryStringParameters.id) {
        const id = parseInt(event.queryStringParameters.id);
        // Requête pour un étudiant spécifique
        params.Key = { id: id };
        response = await dynamoDb.get(params).promise();
    } else {
        // Requête pour tous les étudiants
        response = await dynamoDb.scan(params).promise();
    }
 
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};