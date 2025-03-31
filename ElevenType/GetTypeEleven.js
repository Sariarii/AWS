const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
exports.handler = async (event) => {
    let response;
    const params = {
        TableName: "ELEVENTYPEAWSE4",
    };
 
    if (event.queryStringParameters && event.queryStringParameters.equipeType) {
        const equipeType = parseInt(event.queryStringParameters.equipeType);
        // Requête pour des joueurs spécifiques
        params.FilterExpression = "equipeType = :equipeType";
        params.ExpressionAttributeValues = {
            ":equipeType": equipeType
        };
        response = await dynamoDb.scan(params).promise();
    } else {
        // Requête pour tous les joueurs
        response = await dynamoDb.scan(params).promise();
    }
 
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};