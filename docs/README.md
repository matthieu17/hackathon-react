# Hackathon *backend* documentation

Bienvenue sur la documenation du *backend* de ce hackathon.

## Principe

## Configuration

Un [fichier de configuration](../backend/settings.js) permet de modifier sensiblement le fonctionnement du backend. On y note les options suivantes :

* `port`: permet de séléctionner le port sur lequel le serveur doit écouter.
  * Attention : si modifié, il faut aussi modifier la directive `proxy` du [package.json](../package.json).
* `protect`: permet d'activer l'authentification
* `database`: 
  * `path`: permet de modifier l'emplacement de la base de données JSON
* `security`:
  * `privateKey`: La clé privée servant à génerer les tokens
  * `algorithm`: l'algorithme de chiffrement des tokens
* `uploadPath`: Le chemin relatif à `backend/public` dans lequel seront déposés les fichiers uploadés


## Fonctionnement

Le *backend* proposé utilise la bibliothèque [*json-server*](https://github.com/typicode/json-server).

Cette dernière permet d'avoir une *API REST* fonctionnelle et éditable avec un simple [fichier JSON](../backend/database/db.json).

Vous pouvez donc facilement dans ce fichier JSON :
* Modifier la structure des données
* Ajouter/modifier des données à la main

Cependant, une surcouche a été ajoutée afin d'étendre un peu ces fonctionnalités et ajouter :
* Un serveur de fichiers statiques
* Un service d'upload de fichiers
* Un système d'authentification utilisant la "base de données" JSON.

## Fetch data

## Endpoints

Chaque *endpoint* est disponible en liste ou en individuel :
* GET /api/dishes
  * Renverra la liste des plats
* GET /api/dishes/23
  * Renverra le plat ayant un ID à 23

Pour les détails des méthodes possibles suivant les *endpoints*, voir la [documentation de json-*server*](https://github.com/typicode/json-server#routes) à ce sujet.

Tous les *endpoints* de données seront derrière la route `/api`.

### /api/users

Renvoie la liste des utilisateurs sous forme d'*array* *JSON*.
Chaque utilisateur aura le format suivant :

```json
{
    "id": 98,
    "firstName": "Nathan",
    "lastName": "Schneider",
    "email": "nathan_schneider21@gmail.com",
    "password": "vUofe8",
    "role": "customer"
}
```

### /api/commands

Renvoie la liste des commandes sous forme d'*array* *JSON*.
Chaque commande aura le format suivant :

```json
{
    "id": 0,
    "date": 1579087800000,
    "dishes": [
    81
    ],
    "userId": 22,
    "placeId": 35
}
```

### /api/menus

Renvoie la liste des menus sous forme d'*array* *JSON*.
Chaque menu aura le format suivant :

```json
{
    "id": 0,
    "date": 1579087800000,
    "choices": [
        15,
        99,
        33,
        16,
        81
    ]
}
```

### /api/dishes

Renvoie la liste des plats sous forme d'*array* *JSON*.
Chaque plat aura le format suivant :

```json
{
    "id": 0,
    "price": 5,
    "title": "Taboulé de mémé",
    "ingredients": [
        "semoule moyenne",
        "concombre",
        "tomate",
        "poivron vert",
        "oignon",
        "citron",
        "huile d'olive",
        "poivre",
        "sel"
    ],
    "image": "https://assets.afcdn.com/recipe/20140701/57578_w420h344c1cx2062cy1375.jpg",
    "description": "Et labore magnam voluptas pariatur accusamus rerum natus quis blanditiis. Mollitia repudiandae molestiae explicabo iste atque esse dolor.",
    "type": "entree",
    "tags": [
        "vegetarien",
        "taboule"
    ]
}
```

## Fichiers statiques

### Download

Tous les fichiers contenus dans le dossier [`backend/public/`](../backend/public/) seront servis depuis la racine du serveur.

Essayez par exemple : http://localhost:8080/uploads/cat.png

### Upload

Le *backend* dispose aussi d'un service d'upload de fichiers à la route `/api/upload`.

Il accepte les uploads de fichiers un par un seulement, et encodés en `multipart/form-data`. Le nom du champs doit être `file`.

Il déposera les fichiers dans le dossier `backend/public` et renverra leur URL dans un objet *JSON*.

Pour vous en servir dans votre application, je vous recommande les ressources suivantes :

* https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
* https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
* https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch#Corps

## Authentification

Pour activer le système d'authentification, il suffit de passer l'option `protect` à *true* dans le [fichier de configuration](../backend/settings.js) du *backend*.
N'oubliez pas de redémarrer le serveur.

## Fonctionnement

Le système d'authentification génère un *token* pour toute authentification réussie, qu'il renvoie en réponse.

Ce *token* doit ensuite être utilisé pour chaque requête sur les données, en le passant en *header* **Authorization** en tant que *Bearer token*.

Exemple avec fetch :

```js
fetch('/api/dishes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    },
    body: ...
})
```

## POST /api/users/authenticate

Attends un *body* en JSON de la forme suivante :

```json
{
    "login": "user@gmail.com",
    "password": "azerty"
}
```

Et réponds un objet JSON de la forme suivante :

```json
{
    "token": "eyJhbGciOiJI...",
    "user": {
        "id": 100,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@gmail.com",
        "role": "admin"
    }
}
```

**Note** : *Ce endpoint accepte aussi les identifiants sous forme de [header Basic Auth](https://developer.mozilla.org/fr/docs/Web/HTTP/Authentication)*.

## GET /api/users/me

Cette route renvoie l'utilisateur auquel appartient le *token*. Elle peut notemment servir pour vérifier si un *token* est encore valide.

