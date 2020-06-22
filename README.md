# Hackathon React 2020

Bienvenue dans le hackathon React 2020 de la LP MIAW !

## Le sujet

### Pitch

Vous êtes un jeune entrepreneur qui lance son affaire de traiteur. Vous souhaiteriez proposer des menus au choix chaque semaine pour des commandes groupées.

Vous avez remarqué que dans les entreprises et à l’université, les choix et la qualité des plats disponibles laisse à désirer, et que la livraison individuelle revient très cher. 
Il vous est alors venu l’idée de proposer de livrer des repas dans certains endroits définis, comme des lieux de travail, des universités ou autres, mais uniquement à partir d'un certain nombre de commandes pour ce même lieu.

Vous souhaitez créer une application web pour gérer cette affaire.

### Déroulement

Début des hostilités le Jeudi 16 Janvier à 9h30 !
Vous aurez jusqu'au lendemain, le vendredi 17, aux alentours de midi pour réaliser votre application.

Vous devrez ensuite présenter votre projet devant un jury le vendredi après midi.

Deux ateliers auront lieu dans la journée du Jeudi :
* Introduction à React pour les WDI
* Atelier authentification

Ces ateliers sont complètement facultatifs.

## Le starter template

Un starter template (ce repository Git) vous est fourni. Il comporte un backend contenant quelques données, ainsi qu'un setup de base de développement front-end fait avec Create React App, que vous connaissez.

Vous n'avez plus qu'à le *fork* !

### Setup

Comme d'habitude, vous pouvez installer les dépendances du projet avec la commande suivante :

```bash
npm install
```

### Backend

Vous pouvez lancer le serveur avec la commande :

```bash
npm run server
```

Create React App est configuré pour jouer un rôle de proxy, toutes les requêtes sur le serveur de développement seront redirigées vers le backend.
Autrement dit, il est par exemple possible de faire une requête GET sur `/api/commands` sans préciser d'hôte ou de port.

Il dispose également d'un système d'authentification ainsi que d'un serveur de fichiers statiques (download et upload).

Pour plus de détails, voir la [documentation](./docs/README.md).


### Front-end

Le setup de la partie front-end est fait avec Create React App, dont vous pourrez trouver la documentation [ici](https://create-react-app.dev/docs/getting-started) au besoin.

Pour lancer le serveur de développement, il suffit de lancer la commande :

```bash
npm run start
```

Un navigateur devrait alors s'ouvrir.

### Connexion à l'application

Username: test@test.com
password: test

### Test de l'application

Parceque cette application s'est developpé en moins de 48h, vous devez suivre les étapes suivantes pour le test. Une fois connecté :

- Selectionnez un jour entre le 16/01/2020 et le 25/01/2020
- Selectionnez les plats que vous desirez dans votre menu du jour
- Selectionnez le nombre de menus que vous souhaitez commander (par défaut : 5 menus)
- Cliquez sur commander
- Vérifiez le détail de votre commande
- Entrez une adresse de livraison
- Validez la commande
- Profitez de votre menu personnalisé

## License

[MIT License](LICENSE)

Copyright (c) 2020 Clément Dandrieux

