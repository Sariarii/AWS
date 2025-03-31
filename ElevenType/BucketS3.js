const AWS = require('aws-sdk'); 
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3({ region: 'eu-west-3' });

async function createBucket() {
    try {
        await s3.createBucket({ Bucket: "eleventypeestiame4tarbes" }).promise();
        console.log(`Bucket eleventypeestiame4tarbes créé avec succès.`);
    } catch (err) {
        if (err.code == "BucketAlreadyOwnedByYou") {
            console.log(`Le bucket eleventypeestiame4tarbes existe déjà.`);
        } else {
            console.error("Erreur lors de la création du bucket :", err);
            throw err;
        }
    }
}

async function uploadFiles() {
    await createBucket()
    try {
        // Lire tous les fichiers du dossier
        const files = fs.readdirSync("Logos");

        if (files.length == 0) {
            console.log("Aucun fichier trouvé dans le dossier.");
            return;
        }

        files.forEach(file => {
            const filePath = path.join("Logos", file);
            const fileContent = fs.readFileSync(filePath);

            const params = {
                Bucket: "eleventypeestiame4tarbes",
                Key: file,
                Body: fileContent
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.error(`Erreur lors de l'upload du fichier ${file} :`, err);
                } else {
                    console.log(`Fichier ${file} téléversé avec succès !`);
                }
            });
        });

    } catch (error) {
        console.error("Erreur lors de la lecture des fichiers :", error);
    }
}

module.exports={uploadFiles}
