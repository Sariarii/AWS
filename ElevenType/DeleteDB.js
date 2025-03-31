const AWS = require('aws-sdk');  
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    if (!event.queryStringParameters || !event.queryStringParameters.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "L'ID est requis pour effectuer une suppression." })
        };
    }

    const id = parseInt(event.queryStringParameters.id);
    const params = {
        TableName: "ELEVENTYPEAWSE4",
        Key: { id: id },
        ReturnValues: "ALL_OLD"
    };

    try {
        const result = await dynamoDb.delete(params).promise();

        if (!result.Attributes) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `Aucun élément trouvé avec l'ID ${id}.` })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `L'élément avec ID ${id} a été supprimé avec succès.`,
                deletedItem: result.Attributes
            })
        };
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erreur lors de la suppression", error: error.message })
        };
    }
};
