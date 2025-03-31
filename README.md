# Documentation du Logiciel "Equipe Type Ligue 1"

## Introduction
Le logiciel "Equipe Type Ligue 1" permet de gérer une équipe type en Ligue 1 en interagissant avec une base de données DynamoDB AWS. L'application permet de récupérer, modifier, ajouter et supprimer des joueurs à partir d'une API AWS Lambda exposée via API Gateway. De plus, les logos des clubs sont stockés dans un bucket S3.

## Fonctionnalités
Le logiciel fournit plusieurs fonctionnalités principales via des requêtes API :

### 1. Récupération des joueurs (GET)
- **Endpoint:** `GET /PlayerEleven`
- **Description:** Retourne tous les joueurs enregistrés.
- **Paramètres:**
  - `equipeType=1` (optionnel) : Si présent, retourne uniquement les joueurs de l'équipe type.
- **Exemple d'utilisation:**
  ```
  GET https://ucdlta1g3m.execute-api.eu-west-3.amazonaws.com/Player/PlayerEleven
  GET https://ucdlta1g3m.execute-api.eu-west-3.amazonaws.com/Player/PlayerEleven?equipeType=1
  ```

### 2. Mise à jour de l'équipe type (PATCH)
- **Endpoint:** `PATCH /PlayerEleven`
- **Description:** Modifie la colonne `equipeType` d'un joueur spécifique.
- **Paramètres:**
  - `id` (query parameter) : Identifiant du joueur.
- **Corps de la requête:**
  ```json
  {
    "equipeType": 1
  }
  ```
- **Exemple d'utilisation:**
  ```
  PATCH https://ucdlta1g3m.execute-api.eu-west-3.amazonaws.com/Player/PlayerEleven?id=10
  ```

### 3. Suppression d'un joueur (DELETE)
- **Endpoint:** `DELETE /PlayerEleven`
- **Description:** Supprime un joueur de la base de données.
- **Paramètres:**
  - `id` (query parameter) : Identifiant du joueur.
- **Exemple d'utilisation:**
  ```
  DELETE https://ucdlta1g3m.execute-api.eu-west-3.amazonaws.com/Player/PlayerEleven?id=10
  ```

### 4. Ajout d'un joueur (PUT)
- **Endpoint:** `PUT /PlayerEleven`
- **Description:** Ajoute un nouveau joueur dans la base de données.
- **Corps de la requête:**
  ```json
  {
    "id": 15,
    "prenom": "Kylian",
    "nom": "Mbappe",
    "age": 25,
    "poste": "Attaquant",
    "club": "Paris Saint-Germain",
    "equipeType": 1
  }
  ```
- **Exemple d'utilisation:**
  ```
  PUT https://ucdlta1g3m.execute-api.eu-west-3.amazonaws.com/Player/PlayerEleven
  ```

## Architecture Technique

### 1. API AWS Lambda
Chaque fonctionnalité est implémentée sous forme de fonctions AWS Lambda créées via la ligne de commande et associées à une méthode de l'API Gateway.

### 2. DynamoDB
La base de données utilisée est DynamoDB avec une table nommée `ELEVENTYPEAWSE4` contenant les informations des joueurs.

### 3. Stockage des images (S3)
Les logos des clubs de **Strasbourg, Marseille, Paris, Monaco, Lille** sont stockés dans un bucket S3 nommé `eleventypeestiame4tarbes`.

### 4. Gestion des permissions (IAM)
Un utilisateur IAM a été créé avec des permissions `Full Access` sur les services AWS nécessaires (Lambda, DynamoDB, S3, API Gateway) afin d'assurer le bon fonctionnement de l'application.

## Conclusion
Ce logiciel permet une gestion efficace et automatisée de l'équipe type de Ligue 1, en s'appuyant sur AWS pour assurer une scalabilité et une haute disponibilité.


