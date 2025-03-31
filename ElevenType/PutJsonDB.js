var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
var ddb = new AWS.DynamoDB.DocumentClient();
var fs = require("fs");
var path = require("path");

async function PutJson() {
    let count = 0;

    try {
        // Lire tous les fichiers du dossier "Json"
        const files = fs.readdirSync("Json");

        // Filtrer uniquement les fichiers JSON
        const jsonFiles = files.filter(file => path.extname(file) == ".json");

        // Boucler sur chaque fichier JSON
        for (const file of jsonFiles) {
            // Lire et parser le contenu du fichier JSON
            const fileContent = fs.readFileSync(path.join("Json", file), "utf-8");
            const JSONContent = JSON.parse(fileContent);

            // Boucler sur chaque élément du fichier JSON
            for (const team of JSONContent) {
                count++;

                // Paramètres pour l'ajout dans DynamoDB
                const params = {
                    TableName: "ELEVENTYPEAWSE4",
                    Item: {
                        id: team.id,
                        prenom: team.prenom,
                        nom: team.nom,
                        age: team.age,
                        poste: team.poste,
                        club: team.club,
                        equipeType : team.EquipeType
                    },
                };
                await ddb.put(params).promise();
                console.log(`Ajouté (${count}): ${team.nom}`);
            }
        }

        console.log(` Tous les éléments ont été ajoutés (${count} au total).`);

    } catch (error) {
        console.error(" Une erreur s'est produite :", error);
    }
}

module.exports = { PutJson };
