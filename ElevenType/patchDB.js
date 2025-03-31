const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let response;

    // Validation des paramètres d'entrée
    const { equipeType } = JSON.parse(event.body); 
    if (equipeType == undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "L'attribut 'equipeType' est requis" }),
        };
    }

    const params = {
        TableName: "ELEVENTYPEAWSE4",
    };

    // Vérification de la présence de l'ID dans les paramètres de la requête
    if (event.queryStringParameters && event.queryStringParameters.id) {
        const id = parseInt(event.queryStringParameters.id);
        params.Key = { id: id };

        // Expression de mise à jour
        params.UpdateExpression = "set equipeType = :equipeType";
        params.ExpressionAttributeValues = {
            ":equipeType": equipeType, // Nouvelle valeur pour 'equipeType'
        };
        params.ReturnValues = "UPDATED_NEW";  // Retourner les valeurs mises à jour

        try {
            // Mise à jour de l'élément dans DynamoDB
            const result = await dynamoDb.update(params).promise();

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `L'attribut 'equipeType' a été mis à jour avec succès pour l'élément avec ID ${id}.`,
                    updatedAttributes: result.Attributes // Affichage des nouveaux attributs
                })
            };
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Erreur lors de la mise à jour",
                    error: error.message
                })
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "L'ID est requis pour effectuer une mise à jour."
            })
        };
    }
};
