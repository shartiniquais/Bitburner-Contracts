/*
*

# Unique Paths in a Grid II
# You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


# You are located in the top-left corner of the following grid:

# 0,1,0,1,0,0,0,0,0,0,1,1,
# 0,1,0,0,0,0,0,0,0,0,0,0,
# 0,0,0,0,0,1,0,0,0,0,0,0,
# 1,0,0,0,0,0,0,0,0,0,0,0,
# 1,0,0,1,0,1,1,0,0,1,0,0,
# 0,0,0,0,1,0,0,0,0,0,1,0,

# You are trying reach the bottom-right corner of the grid, but you can only move down or right on each step. Furthermore, there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

# Determine how many unique paths there are from start to finish.

# NOTE: The data returned for this contract is an 2D array of numbers representing the grid.


# If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.


*/


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
 
    let result = uniquePaths(grid);
 
    // Nom du fichier de contrat et serveur de codage
    let contractFileName = ns.args[1];
    let serverCoding = ns.args[2];
 
    ns.codingcontract.attempt(result,contractFileName,serverCoding);
    
    function uniquePaths(grid){
       /**
        * On va editer la grille pour transformer en 1 toutes les cases innaccessibles
        * 
        * Reprenons l'exemple de l'énnoncé : 
        * grid =  [[0,1,0,1,0,0,0,0,0,0,1,1],
          #        [0,1,0,0,0,0,0,0,0,0,0,0],
          #        [0,0,0,0,0,1,0,0,0,0,0,0],
          #        [1,0,0,0,0,0,0,0,0,0,0,0],
          #        [1,0,0,1,0,1,1,0,0,1,0,0],
          #        [0,0,0,0,1,0,0,0,0,0,1,0]]
 
          # On va vérifier la première ligne, et dès qu'on trouve un 1, on met 1 pour les autres cases de la ligne
          # Ici la première ligne est [0,1,0,1,0,0,0,0,0,0,1,1]
          # on va regarder successivement chaque case de la ligne
          # On vois que la deuxième case est 1 et que les cases au dessus sont soit vides soit des 1, donc on met 1 pour les autres cases de la ligne
          # La première ligne devient donc [0,1,1,1,1,1,1,1,1,1,1,1]
          # On fait pareil pour les autres lignes
          # On aura donc :
          # grid = [[0,1,1,1,1,1,1,1,1,1,1,1],
          #         [0,1,1,1,1,1,1,1,1,1,1,1],
          #         [0,0,0,0,0,1,1,1,1,1,1,1],
          #         [1,0,0,0,0,0,0,0,0,0,0,0],
          #         [1,0,0,1,0,1,1,0,0,1,0,0],
          #         [0,0,0,0,1,0,0,0,0,0,1,0]]
 
          On va ensuite faire la même chose cette fois de bas en haut
          # grid = [[0,1,1,1,1,1,1,1,1,1,1,1],
          #         [0,1,1,1,1,1,1,1,1,1,1,1],
          #         [0,0,0,0,0,1,1,1,1,1,1,1],
          #         [1,0,0,0,0,0,0,0,0,0,0,0],
          #         [1,1,1,1,1,1,1,1,1,1,0,0],
          #         [1,1,1,1,1,1,1,1,1,1,1,0]]
          Puis faire les colomnes de gauche à droite puis de droite à gauche
          (Pour l'exemple rien ne change, mais ça peux être utile pour d'autres grids)
 
        */
 
       //On commence par les lignes de haut en bas
       for(let i = 0; i < grid.length; i++){ //chaque ligne
          for(let j = 0; j < grid[0].length; j++){ //chaque case dans la ligne
             if (grid[i][j] == 1) { //Si c'est un obstacle
                for(let k = j; k < grid[0].length; k++){ //On parcours toutes les cases après le 1
                   if(i == 0){ //Si i == 0 pour éviter une erreur d'index out of range
                      grid[i][k] = 1;
                   } else if (grid[i-1][k] == 1){ // Si la case au dessus est un obstacle
                      grid[i][k] = 1;
                   } else { // Si il n'y a pas de 1 au dessus, et qu'on est pas sur la première ligne, on arrête la recherche
                      break;
                   }
                }
             }
          }
       }
 
       ns.print("Grid après les lignes de haut en bas : ");
       printGrid(grid);
 
 
       //On continue de bas en haut cette fois
       for (let i = grid.length-1; i > -1; i--){
          for (let j = grid[0].length-1; j > -1; j--){
             if (grid[i][j] == 1){
                for(let k = j; k > -1; k--){
                   if(i == grid.length-1){
                      grid[i][k] = 1;
                   } else if (grid[i+1][k] == 1){
                      grid[i][k] = 1;
                   } else {
                      break;
                   }
                }
             }
          }
       }
 
       ns.print("Grid après les lignes de bas en haut : ");
       printGrid(grid);
 
       //Maintenant les colonnes de Gauche à Droite
       for (let j = 0; j < grid[0].length; j++){
          for (let i = 0; i < grid.length; i++){
             if (grid[i][j] == 1){
                for(let k = i; k < grid.length; k++){
                   if (j == 0){
                      grid[k][j] = 1;
                   } else if(grid[k][j-1] == 1){
                      grid[k][j] = 1;
                   } else {
                      break;
                   }
                }
             }
          }
       }
 
       ns.print("Grid après les colonnes de gauche à droite : ");
       printGrid(grid);
 
       //Pour finir, les colonnes de Droite à Gauche
       for (let j = grid[0].length-1; j > -1; j--){
          for (let i = grid.length-1; i > -1; i--){
             if (grid[i][j] == 1){
                for(let k = i; k > -1; k--){
                   if (j == grid[0].length-1){
                      grid[k][j] = 1;
                   } else if (grid[k][j+1] == 1){
                      grid[k][j] = 1;
                   } else {
                      break;
                   }
                }
             }
          }
       }
 
       ns.print("Grid finale après les colonnes de droite à gauche : ");
       printGrid(grid);
 
       //Initialisation de unique_Paths, une grid de même dimension que grid pour compter les chemins par case : 
       let unique_Paths = [];
       for (let i = 0; i < grid.length; i++) {
          unique_Paths[i] = [];
          for (let j = 0; j < grid[0].length; j++) {
             unique_Paths[i][j] = 0;
          }
       }
       //On initie donc un tableau de même dimension que grid, rempli de 0 par défault
 
 
 
       //On initialise le nombre de chemins unique pour atteindre la case de départ à 0
       unique_Paths[0][0] = 1;
 
       //On va itérer dans la grid
       for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[0].length; j++){
             //Si la cellule n'est pas un obstacle (!=1)
             if(grid[i][j] === 0){
                //On vérifie si la cellule est dans la première ligne ou colonne : 
                if (i == 0 || j == 0){
                   //On met directement la distance à 1 car inaténiable plus d'une fois
                   unique_Paths[i][j] = 1;
                } else {
                   //Le nombre de chemins uniques atteignant cette cell sera la somme des chemins uniques des cells au dessus et à gauche
                   unique_Paths[i][j] = unique_Paths[i-1][j] + unique_Paths[i][j-1] 
                }
             }
             //print les unique_Paths
             //ns.print("unique_Paths["+i+"]["+j+"] = " + unique_Paths[i][j]);
          }
       }
       ns.print("Matrice des chemins uniques : ");
       for(let row = 0; row < unique_Paths.length; row++){
          ns.print(unique_Paths[row]);
       }
 
       //Résultat final : 
       ns.print ("Nombre de chemins uniques : " + unique_Paths[unique_Paths.length - 1][unique_Paths[0].length - 1]);
       return (unique_Paths[unique_Paths.length - 1][unique_Paths[0].length - 1]);
    }
 
    function printGrid(grid){
       for (let row = 0; row < grid.length; row++){
          ns.print(grid[row]);
       }
    }
 }