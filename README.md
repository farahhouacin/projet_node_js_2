Qu’est-ce que node js ?
Open source JS environnement destiné à être utilisé en dehors du navigateur (OS du server)

Qu’est-ce que Express js ?
C’est un framework qui permet de développer des application web node JS. Il contient des modules permettant plusieurs fonctionnalités.

Requête http :
Http → lancer un serveur web, envoyer des requêtes 
Https → lancer un serveur SSL

Event Loop (cycle de vie d’un programme Node) : exécute les fonctions de façon asynchrone toute la durée du programme

Request Headers : ce sont les métadonnées envoyées par les requêtes HTTP

Response : résultat de la requête, exploitable pour l’affichage côté client

Buffer : récupère requête entrante

Middleware : Pour passer d'une fonction à une autre, et ne pas bloquer l'exécution du code, on ajoute le mot clé next en argument de la fonction (après req et res), ce qui va permettre de passer à la fonction suivante.

APIs REST : permettent de gérer la partie front (interface graphique côté client - utilisateur) et la partie back (logique métier côté server, requête SQL à la base de données, routage) d'un projet.

Routing : On utilise les méthodes GET (afficher) POST (créer) PUT (modifier) DELETE (supprimer) ; pour exécuter les requêtes envoyées par le client au server. 

CORS : Sécurité ; côté server ; prévient les connexions potentiellement dangereuses grâce aux en-tête http et contrôle l'accès au contenu des serveurs externes.
