/** @param {NS} ns */
export async function main(ns) {
    ns.tail();

    // Conversion de la grille en tableau à deux dimensions
    let gridString = ns.args[0];
    // La grille est fournie sous forme de chaîne de caractères, nous devons la convertir en tableau
    // Exemple : grid = "[[0,0,1,0,0],[1,0,0,0,1]]"
    
    // Supprime les crochets extérieurs de la chaîne de caractères
    gridString = gridString.slice(2, -2);
    // Résultat : "0,0,1,0,0],[1,0,0,0,1"

    // Divise la chaîne en lignes
    let lines = gridString.split('],[');
    // Résultat : ["0,0,1,0,0", "1,0,0,0,1"]

    // Convertit chaque ligne en un tableau de nombres et ajoute à la grille
    let grid = lines.map(line => line.split(',').map(Number));

    // Affiche la grille convertie pour vérification
    ns.print(grid);

    // Appelle la fonction pour trouver le chemin le plus court
    let path = shortestPath(grid);

    // Affiche le chemin trouvé
    //Si le chemin est vide on affiche un message
    if(path == ''){
      ns.print("Pas de chemin possible")
    } else {
      ns.print(path);
    }


    // Nom du fichier de contrat et serveur de codage
    let contractFileName = ns.args[1];
    let serverCoding = ns.args[2];

    // Tente de résoudre le contrat avec le chemin trouvé
    let result = ns.codingcontract.attempt(path, contractFileName, serverCoding);
    ns.print(result);
}

/**
 * Utilise l'algorithme de recherche en largeur (BFS) pour trouver le chemin le plus court dans une grille.
 * BFS est un algorithme de parcours de graphe qui explore tous les nœuds voisins à la profondeur actuelle
 * avant de passer aux nœuds de la profondeur suivante. Il est efficace pour trouver le chemin le plus court
 * dans les graphes non pondérés.
 * 
 * Wiki : https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur
 * 
 * @param {Array<Array<number>>} grid - Grille représentant les obstacles (1) et les chemins libres (0).
 * @return {string} - Chemin le plus court sous forme de chaîne de caractères UDLR (Haut, Bas, Gauche, Droite).
 */
function shortestPath(grid) {
    // Initialiser une file d'attente pour stocker les cellules à explorer
    let queue = [];

    // Initialiser un dictionnaire pour stocker la distance de la cellule de départ à chaque cellule
    let distance = {};

    // Initialiser un dictionnaire pour stocker la cellule parente pour chaque cellule
    let parent = {};

    // Initialiser la cellule de départ comme le coin supérieur gauche
    let start = [0, 0];

    // Ajouter la cellule de départ à la file d'attente
    queue.push(start);
    distance[start] = 0; // La distance de départ à départ est 0
    parent[start] = null; // null signifie pas de parent (car on est sur la case de départ)

    // Tant que la file d'attente n'est pas vide
    while (queue.length > 0) {
        // Retirer une cellule de la file d'attente car nous allons l'explorer en l'affectant a la cellule courante et en utilisant shift()
        let current = queue.shift();

        // Si la cellule est le coin inférieur droit, sortir de la boucle car on est arrivé
        if (current[0] === grid.length - 1 && current[1] === grid[0].length - 1) {
            break;
        }

        // Explorer les cellules voisines
        //                    Droite   Bas    Gauche     Haut
        for (let [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            let x = current[0] + dx;
            let y = current[1] + dy;
            // On vérifie si la case est dans les limites de la grille et si elle n'a pas d'obstacles (grid[x][y] === 0 -> pas d'obstacles)
            if (0 <= x && x < grid.length && 0 <= y && y < grid[0].length && grid[x][y] === 0) { 
                let neighbor = [x, y];
                let neighborKey = neighbor.toString();
                // Si le voisin n'a pas encore été visité
                if (!(neighborKey in distance)) {
                    // Mettre à jour la distance et la cellule parente
                    distance[neighborKey] = distance[current.toString()] + 1;
                    parent[neighborKey] = current;
                    // Ajouter la cellule voisine à la file d'attente
                    queue.push(neighbor);
                }
            }
        }
    }

    // Vérifier si le coin inférieur droit a été atteint
    let target = [grid.length - 1, grid[0].length - 1];
    if (!(target.toString() in parent)) {
        return '';
    }

    // Revenir en arrière depuis le coin inférieur droit pour trouver le chemin le plus court
    let path = '';
    let current = target;
    while (current[0] !== start[0] || current[1] !== start[1]) {
        let parentCell = parent[current.toString()];
        // Déterminer la direction du déplacement
        if (parentCell[0] === current[0]) {
            if (parentCell[1] < current[1]) {
                path = 'R' + path;
            } else {
                path = 'L' + path;
            }
        } else {
            if (parentCell[0] < current[0]) {
                path = 'D' + path;
            } else {
                path = 'U' + path;
            }
        }
        current = parentCell;
    }

    // Retourner le chemin le plus court sous forme de chaîne de caractères UDLR
    return path;
}
