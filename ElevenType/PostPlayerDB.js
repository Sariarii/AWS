const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
exports.handler = async (event) => {
    let body;
    body=JSON.parse(event.body)
    const id = body.id
    const prenom=body.prenom
    const nom= body.nom
    const age = body.age
    const poste = body.poste
    const club = body.club
    const equipeType = body.equipeType
    const params = {
        TableName: "ELEVENTYPEAWSE4",
        Item: {
            id: id,
            prenom: prenom,
            nom: nom,
            age: age,
            poste: poste,
            club: club,
            equipeType : equipeType
        },
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