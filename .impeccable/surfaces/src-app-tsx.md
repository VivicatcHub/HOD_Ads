---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/poster"]
---

# Surface: HOD Ads, éditeur d'affiches

Scope: l'application entière (éditeur + gabarits d'affiches). Mode: Persuade pour les affiches produites (elles doivent faire venir des joueurs), Operate pour l'éditeur qui les fabrique.

Audience: bureau et responsables de pôle de Heaven of Dice. Tâche: choisir un pôle, une édition (hebdo / spéciale), remplir les champs, choisir un format, exporter PNG/JPG/PDF.

## Direction contract

THESIS: Chaque affiche est le couvercle d'une boîte de jeu de la collection Heaven of Dice. Le nom de l'event est le titre de la boîte, date/heure/lieu/prix sont les pictos du bandeau « joueurs · durée · âge ». Refuse le gabarit « titre centré sur photo floue + bloc d'infos ».

OWN-WORLD: Rebord de couvercle violet HOD profond (#2b0a57) encadrant une illustration imprimée en aplat pleine couleur du pôle, motif propre au pôle dessiné en SVG (grille de go, cartes en éventail, pions, carte hex, règle de tir, jetons, lune et yeux), phénix HOD comme illustration de couverture, bandeau pictos à cellules, pastille de coin datée. Édition spéciale: écharpe dorée « Édition spéciale », violet électrique (#a30af5) qui envahit la couverture, éclats cristallins. Anybody (largeur variable) pour les titres, Hanken Grotesk pour les infos.

STORY: L'utilisateur reconnaît une boîte de jeu de son pôle, la remplit, l'exporte. Le joueur qui voit l'affiche comprend en une seconde quel jeu, quand, où.

FIRST VIEWPORT: Tapis de jeu violet nuit. À gauche une étagère verticale de 7 tranches de boîtes (les pôles), la choisie sortie du rang. Au centre le couvercle à l'échelle, ombre réelle. À droite la fiche de règles (formulaire papier violet pâle). En bas de la fiche: formats et export.

FORM: Couvercle de boîte de jeu, candidat 3 de la liste ordonnée, seed 3b58ef8b. Signature: le pôle sort de l'étagère et le couvercle se réimprime dans sa couleur. Raises: tranches toujours présentes (cathode), aplat total (sérigraphie), présence physique (cuir), grille unique (oscilloscope), vide actif en hebdo (ikebana).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
