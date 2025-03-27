var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
var ddb = new AWS.DynamoDB();

async function waitForTableActive(tableName) {
  console.log("Vérification du statut de la table...");

  while (true) {
    try {
      let data = await ddb.describeTable({ TableName: tableName }).promise();
      let status = data.Table.TableStatus;
      console.log(`Statut actuel de la table: ${status}`);

      if (status === "ACTIVE") {
        console.log("Table prête !");
        break;
      }
    } catch (err) {
      console.error("Erreur lors de la vérification du statut :", err);
    }

    console.log("En attente de l'activation de la table...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

async function CreateTable() {
  var params = {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "ESTIAMNTAWSE4",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  try {
    console.log("Création de la table en cours...");
    let data = await ddb.createTable(params).promise();
    console.log("Table créée, statut initial :", data.TableStatus);

    await waitForTableActive(params.TableName);
  } catch (err) {
    console.error("Erreur lors de la création de la table :", err);
  }
}
module.exports={CreateTable}