---
name: HOD Ads
description: Éditeur d'affiches Heaven of Dice, où chaque affiche est le couvercle d'une boîte de jeu de la collection HOD.
colors:
  hod-night: "#14062b"
  hod-deep: "#2b0a57"
  hod-royal: "#5a14a0"
  hod-electric: "#a30af5"
  hod-orchid: "#e58cf5"
  hod-lilac: "#f3ecfb"
  hod-gold: "#e9b949"
  pole-reflexion: "#ede6d6"
  pole-tcg: "#1f5ad6"
  pole-societe: "#ff7417"
  pole-jdr: "#0f8a7e"
  pole-wargames: "#cc1f2b"
  pole-poker: "#0f7a43"
  pole-mensonges: "#131016"
  felt: "#170830"
  felt-2: "#22103f"
  felt-3: "#2e1752"
  felt-ink: "#efe6fb"
  felt-muted: "#b7a5d3"
  sheet: "#f5effc"
  sheet-2: "#ebe1f8"
  sheet-ink: "#1f0f3a"
  sheet-muted: "#5f4d7d"
  sheet-line: "#d9cbec"
  violet: "#7a1fd1"
  danger: "#b4233a"
  white: "#ffffff"
typography:
  poster-title:
    fontFamily: "Anybody Variable, sans-serif"
    fontSize: "calc(var(--u) * 15)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78..125"
  poster-wordmark:
    fontFamily: "Anybody Variable, sans-serif"
    fontSize: "calc(var(--u) * 3.1)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 115"
  poster-picto:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, sans-serif"
    fontSize: "calc(var(--u) * 2.5)"
    fontWeight: 800
    lineHeight: 1.12
  poster-tagline:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, sans-serif"
    fontSize: "calc(var(--u) * 2.5)"
    fontWeight: 600
    lineHeight: 1.25
  poster-lip:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, sans-serif"
    fontSize: "calc(var(--u) * 1.4)"
    fontWeight: 600
    letterSpacing: "0.16em"
  headline:
    fontFamily: "Anybody Variable, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Anybody Variable, sans-serif"
    fontSize: "15px"
    fontWeight: 850
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 105"
  spine:
    fontFamily: "Anybody Variable, sans-serif"
    fontSize: "14px"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 64"
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
rounded:
  print: "2px"
  lid: "3px"
  spine: "4px"
  control: "8px"
  field: "10px"
  card: "12px"
  sheet: "18px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "14px"
  2xl: "22px"
  3xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "12px 10px"
  button-primary-hover:
    backgroundColor: "#8a2ae6"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.sheet-ink}"
    rounded: "{rounded.card}"
    padding: "12px 10px"
  button-secondary-hover:
    backgroundColor: "{colors.sheet-2}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sheet-muted}"
    rounded: "{rounded.control}"
    padding: "6px 10px"
  button-ghost-hover:
    backgroundColor: "{colors.sheet-2}"
    textColor: "{colors.sheet-ink}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.sheet-ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.sheet-muted}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  chip-selected:
    backgroundColor: "{colors.sheet-ink}"
    textColor: "{colors.white}"
  edition-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.sheet-muted}"
    rounded: "{rounded.card}"
    padding: "12px"
  edition-card-selected:
    backgroundColor: "{colors.hod-deep}"
    textColor: "#d9c8f2"
  segmented:
    backgroundColor: "{colors.sheet-2}"
    rounded: "{rounded.card}"
    padding: "4px"
  segmented-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.sheet-ink}"
    rounded: "{rounded.control}"
  day-selected:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
  format-card-selected:
    backgroundColor: "#faf6ff"
    textColor: "{colors.sheet-ink}"
    rounded: "{rounded.card}"
  spine:
    textColor: "{colors.white}"
    typography: "{typography.spine}"
    rounded: "{rounded.spine}"
    width: "72px"
  spine-cap:
    backgroundColor: "{colors.hod-deep}"
    textColor: "{colors.white}"
    padding: "4px 0"
---

# Design System: HOD Ads

## Overview

**Creative North Star: "La collection Heaven of Dice"**

Chaque affiche est le couvercle imprimé d'une boîte de jeu d'une même collection. Un rebord violet HOD profond encadre une couverture en aplat pleine couleur du pôle, illustrée par un motif SVG propre au pôle et par le phénix HOD. Le nom de l'évènement est le titre de la boîte ; quand, horaires, lieu et entrée occupent le bandeau de pictos à cellules, comme « joueurs · durée · âge » sur une vraie boîte. Une pastille ronde inclinée porte le jour ou la date en coin, et une ligne de petits caractères au pied du couvercle porte la référence de collection (`Réf. HOD-TCG-HEB`).

L'éditeur est la table de jeu qui fabrique ces boîtes : un tapis feutré violet nuit, une étagère verticale de sept tranches de boîtes (une par pôle, la choisie sortie du rang), le couvercle posé au centre avec une vraie épaisseur et une ombre portée, et à droite une « fiche de règles » papier lilas pâle qui sert de formulaire. Densité moyenne, contrôles nets, aucun ornement qui ne soit pas un objet du jeu.

L'édition hebdo est la boîte classique, sobre et récurrente. L'édition spéciale est l'édition collector : l'or entre (écharpe « Édition spéciale », filet intérieur, pastille, pictos), une gerbe cristalline violet électrique envahit la couverture derrière un médaillon, et le bloc titre devient une étiquette collée de biais.

**Key Characteristics:**

- Rebord violet HOD (`hod-deep`) sur chaque affiche, couverture en aplat de la couleur du pôle.
- Un motif SVG dessiné par pôle, jamais de photo, jamais de flou.
- Titres en Anybody très gras dont la largeur variable s'ajuste au texte ; informations en Hanken Grotesk.
- Tout le gabarit d'affiche est mesuré en `--u` (1 % du petit côté du format), donc identique dans les six formats.
- Le hebdo est sobre, le spécial ajoute l'or et l'éclat ; le violet HOD reste le cadre dans les deux.

## Colors

Deux familles qui ne se mélangent pas : le violet HOD, constant, et la couleur du pôle, qui change toute la couverture ; l'or est réservé à l'édition spéciale.

### Primary

- **Violet couvercle** (`hod-deep`): rebord de toutes les affiches, fond de la pastille hebdo, capuchon « HOD » des tranches, carte d'édition sélectionnée. C'est la couleur qui rend chaque affiche reconnaissable comme HOD.
- **Violet nuit** (`hod-night`): fond du bandeau de pictos en hebdo, la zone la plus sombre du couvercle.
- **Violet royal** (`hod-royal`): filet intérieur du rebord en hebdo (`inset 0 0 0 calc(var(--u) * 0.5)`).
- **Violet électrique** (`hod-electric`): filet du rebord en spécial, rayons de la gerbe cristalline, sélection de texte de l'éditeur.
- **Orchidée** (`hod-orchid`): dé d20 de la marque, mention « présente », texte secondaire de la pastille hebdo, anneau de focus de l'éditeur.
- **Lilas** (`hod-lilac`): couleur de texte par défaut sur le rebord ; la ligne de pied l'emploie à 62 % d'opacité.
- **Violet d'action** (`violet`): couleur d'action de l'éditeur seulement (bouton PNG, jour choisi, format choisi, légendes de section, focus des champs). Plus clair que `hod-royal` pour rester lisible sur la fiche pâle ; il n'apparaît jamais sur une affiche.

### Secondary

- **Or collector** (`hod-gold`): exclusivement l'édition spéciale. Écharpe, filet intérieur arrondi du rebord, pastille de date, cercles des pictos, liseré de l'étiquette titre, liseré du médaillon, contour de la carte « Spéciale » choisie dans l'éditeur.

### Tertiary: les sept pôles

Chaque pôle définit dans `src/data/poles.ts` sept valeurs : `base` (aplat de la couverture et de la tranche), `deep` (médaillon spécial, ombres du motif), `light` (contours de la pastille, des pictos et de l'onglet de pôle), `line` (traits du motif), `ink` et `inkSoft` (titre et accroche sur l'aplat), `second` (couleur d'appoint du motif). Le fichier de données est la source normative ; le gabarit les reçoit en variables `--pole`, `--pole-deep`, `--pole-light`, `--pole-line`, `--pole-ink`, `--pole-ink-soft`.

- **Blanc cassé Réflexion** (`pole-reflexion`): seul aplat clair ; encre violet HOD (`#2b0a57`), sans ombre portée sur le titre.
- **Bleu TCG** (`pole-tcg`), **Bleu-vert JDR** (`pole-jdr`), **Rouge Wargames** (`pole-wargames`), **Vert Poker** (`pole-poker`): aplats saturés, encre blanche.
- **Orange Société** (`pole-societe`): aplat vif, encre violet HOD, titre sans ombre.
- **Noir Mensonges** (`pole-mensonges`): presque noir, encre blanche, `second` violet électrique ; sa tranche reçoit un filet orchidée pour ne pas disparaître sur l'étagère.

### Neutral

- **Tapis** (`felt`, `felt-2`, `felt-3`): fond de l'éditeur, en dégradé radial de `felt-3` au centre vers `felt` sur les bords, sous un grain blanc à 7 %.
- **Encre du tapis** (`felt-ink`) et **encre douce du tapis** (`felt-muted`): légende au-dessus du couvercle.
- **Fiche** (`sheet`, `sheet-2`): papier du formulaire et ses fonds de contrôles groupés ou survolés.
- **Encre de fiche** (`sheet-ink`): texte, filets épais de 2px de la fiche, puce choisie, bordure du bouton secondaire.
- **Encre douce de fiche** (`sheet-muted`): indices, contrôles non choisis.
- **Filet de fiche** (`sheet-line`): bordures de 1.5px des champs, puces et cartes, séparateurs de blocs.
- **Erreur** (`danger`): message d'échec d'export, seul usage.

### Named Rules

**The Two Purples Rule.** Le violet HOD (`hod-*`) appartient à l'affiche, le violet d'action (`violet`) appartient à l'éditeur. Un nouveau contrôle de l'éditeur prend `violet` ; un nouvel élément d'affiche prend un `hod-*`.

**The Gold Is Collector Rule.** L'or n'apparaît que lorsque `data-edition='special'` (affiche) ou sur la carte « Spéciale » choisie (éditeur). Une affiche hebdo n'a aucun or.

**The Pole Owns The Cover Rule.** La couleur du pôle remplit la couverture, l'onglet de pôle, les cercles de pictos en hebdo et la tranche ; elle ne déborde jamais sur le rebord, qui reste violet HOD.

## Typography

**Display Font:** Anybody Variable (axe `wdth`, via `@fontsource-variable/anybody/wdth.css`), repli sans-serif
**Body Font:** Hanken Grotesk Variable (via `@fontsource-variable/hanken-grotesk`), repli system-ui / sans-serif

**Character:** Anybody en graisse 850 à 900 et en capitales donne la voix d'un titre de boîte imprimé, et sa largeur variable (64 % à 125 %) sert à faire tenir les noms longs sans changer de police. Hanken Grotesk, en graisses 600 à 800, porte tout ce qui doit se lire vite : pictos, accroche, formulaire.

### Hierarchy

Sur l'affiche, toutes les tailles sont en `--u` (1 % du petit côté du format).

- **Titre d'affiche** (900, jusqu'à `--u * 15` en portrait, 17 story, 13 carré, 12.5 paysage ; interligne 0.88 ; capitales): nom de l'évènement. La taille et la largeur sont ajustées par le code : la taille descend par pas de 5 % et la largeur parcourt 125 / 112 / 100 / 88 / 78 % jusqu'à ce que le titre tienne sur la largeur et dans 40 à 50 % de la hauteur de couverture. Sous 100 % de largeur, l'interlettrage passe de -0.01em à 0.012em.
- **Marque** (850, `--u * 3.1`, largeur 115 %, capitales): « Heaven of Dice » dans l'en-tête du couvercle.
- **Pastille** (900, `--u * 5`, largeur 88 %, interligne 0.9): jour ou date en coin.
- **Onglet de pôle / face latérale** (850 à 900, `--u * 2.6` / `--u * 4.4`, capitales): nom du pôle.
- **Pictos** (Hanken 800, `--u * 2.5`, `--u * 3` à `3.1` en story et paysage, interligne 1.12, blanc).
- **Accroche** (Hanken 600, `--u * 2.5`, interligne 1.25, `max-width: 34ch`, 40ch en paysage).
- **Petits caractères** (Hanken 600, `--u * 1.4` à `1.55`, interlettrage 0.14 à 0.16em, capitales): mention « présente » sous la marque et ligne de pied du couvercle.
- **Headline éditeur** (Anybody 900, 22px, largeur 118 %, capitales): titre « Fiche de règles ».
- **Title éditeur** (Anybody 850, 15px, largeur 105 %, interlettrage 0.04em, capitales, `violet`): légende de chaque bloc du formulaire. Les cartes d'édition utilisent la même voix à 16px.
- **Tranche** (Anybody 850, 14px, largeur 64 %, verticale): nom court du pôle sur l'étagère ; repasse en horizontal à 85 % sur mobile.
- **Body** (Hanken 400, 15px, interligne 1.45): champs et texte courant de l'éditeur.
- **Label** (Hanken 700, 13px): libellés de champs, boutons de segments et de jours ; 12px, 0.1em, capitales pour les groupes de formats.

### Named Rules

**The Stretch Before Shrink Rule.** Un titre trop long se resserre en largeur (`font-stretch`) avant de perdre de la taille. Ne fixez jamais une taille de titre d'affiche ; laissez la boucle d'ajustement de `Poster.tsx` la trouver.

**The Numbers Align Rule.** Tout chiffre de dimension, de compteur ou de référence (`1080 × 1350`, `54/120`, `Réf. HOD-…`) est en `font-variant-numeric: tabular-nums`.

## Layout

**Affiche.** Grille d'une colonne à quatre rangées nommées `maker` / `cover` / `pictos` / `lip`, marge `--u * 2.8` et gouttière `--u * 1.6`. La couverture prend tout l'espace restant. Le phénix sort du coin haut droit de la couverture en hebdo (56 % de largeur, 44 % en carré, 74 % en story), et se centre sur le médaillon en spécial. Le bloc titre est ancré en bas à gauche de la couverture (`--u * 4` de chaque côté, `--u * 3.6` du bas).

- **Story** (9:16): marges `--u * 3.4`, en-tête descendu de `--u * 6` et pied remonté de `--u * 4` pour les zones d'interface d'Instagram ; pictos en grille 2 × 2.
- **Carré** et **portrait** avec quatre pictos: pictos en grille 2 × 2.
- **Paysage** (A4 et écran 16:9): grille 1.62fr / 1fr, couverture à gauche, à droite une « face latérale » de boîte (nom du pôle, logo, « Collection Heaven of Dice ») au-dessus d'un bandeau de pictos vertical ; l'onglet de pôle de l'en-tête est masqué.
- Les cellules « quand » et « lieu » prennent 1.45 fois la place des autres.

**Style sobre** (`SoberPoster.tsx`, `poster-sober.css`). Variante claire inspirée des affiches de partenariat : fond pâle teinté de la couleur claire du pôle (dégradé et halos blancs, grain conservé), tout centré. De haut en bas : signature « dé + Heaven of Dice × [pôle] » (le pôle dans un cartouche incliné à -12°), pastille « Édition spéciale » si besoin, date en capitales condensées très espacées, titre géant à la couleur du pôle (même boucle d'ajustement), lignes lieu / horaires / prix en capitales condensées, phrase d'accroche. Le phénix sort du coin bas droit, en filigrane (opacité 0,28, sans ombre). En paysage, le texte occupe 62 % à gauche et le phénix se centre à droite ; en story, l'en-tête descend de `--u * 17`. Pas de texture sur le titre : `html-to-image` ignore les `mask-image`, l'export ne correspondrait plus à l'aperçu.

**Partenariats** (`src/partners/<id>/`). Boîte : les logos (version fond sombre) suivent la marque dans l'en-tête, séparés par un « × » à la couleur `soft` de l'asso, chacun posé sur une pastille `chip` (ou `main`) cerclée de `main` ; le sous-titre passe à « présentent » et l'onglet de pôle prend le nom court. Sobre : les logos (version fond clair, ou logo sur pastille) remplacent le cartouche de pôle dans la signature, et le cartouche descend sur la ligne de l'édition spéciale ; les « × » prennent la couleur `main` de l'asso ; le fond devient bicolore : un dégradé à parts égales (160°, 110° en paysage) entre la couleur du pôle et la `main` de chaque asso, toutes mêlées à 30 % de blanc, et la ligne de date prend la `main` de la première asso ; le premier filigrane d'asso se pose en bas à gauche à 35 % (masqué en paysage). En style Boîte, une bande de `--u * 1.6` au pied de l'affiche aligne la couleur du pôle puis la `main` de chaque asso.

**Éditeur.** Grille de trois colonnes `112px | 1fr | minmax(360px, 420px)` sur toute la hauteur : étagère, table, fiche. La table centre le couvercle et le met à l'échelle (au plus 1:1). À 1100px: `96px | 1fr | 360px`, tranches de 62px. À 860px: une colonne ; l'étagère devient une rangée collante en haut, défilante horizontalement ; le couvercle prend son ratio dans 72vh au plus ; la fiche monte avec des coins de 18px et la barre d'export devient collante en bas.

**Rythme.** Pas de 4 / 6 / 8 / 12 px dans les contrôles, 14 à 16px de padding dans l'étagère, 22 à 24px de padding dans la fiche, 22px au-dessus de chaque bloc. Les grilles de la fiche sont en 2 colonnes (champs couplés, éditions) ou 3 colonnes (formats).

## Elevation & Depth

Hybride, et toujours physique : la profondeur ne sert qu'à faire exister des objets du jeu (couvercle, tranches, fiche, étiquette, pastille). Les panneaux de l'éditeur sont plats et se séparent par la valeur (tapis sombre, fiche claire) et par une ombre latérale large.

### Shadow Vocabulary

- **Épaisseur du couvercle** (`0 12px 0 -3px #0c0320, 0 14px 2px -3px rgba(0,0,0,0.6), 0 44px 70px -28px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)`): uniquement le cadre du couvercle sur la table. La première couche nette figure le flanc de la boîte, les suivantes son ombre sur le tapis.
- **Tranche au repos** (`inset -6px 0 0 rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.12), 2px 0 0 #0b0318`): ombre de reliure à droite et arête sombre de 2px contre la tranche voisine.
- **Tranche sortie** (`… 10px 6px 18px rgba(0,0,0,0.55)`): la tranche choisie avance de 24px et prend une ombre portée.
- **Fiche** (`-18px 0 40px -20px rgba(0,0,0,0.7)`): la fiche posée sur le tapis ; vers le haut sur mobile.
- **Bouton principal** (`0 2px 4px rgba(43,10,87,0.35), 0 10px 18px -8px rgba(122,31,209,0.7)`): seul bouton qui flotte, l'export PNG.
- **Carte choisie** (`0 8px 18px -10px rgba(43,10,87,0.8)`): carte d'édition sélectionnée.
- **Segment choisi** (`0 1px 3px rgba(31,15,58,0.18)`).
- **Sur l'affiche**: pastille (`0 calc(var(--u)*0.8) calc(var(--u)*1.8) rgba(20,6,43,0.35)`), étiquette titre spéciale (`0 calc(var(--u)*1.2) calc(var(--u)*3) rgba(20,6,43,0.55)`), écharpe, phénix en `drop-shadow` violet nuit. Toutes les ombres d'affiche sont teintées violet nuit `rgba(20,6,43,…)`, jamais noir neutre, sauf l'écharpe.

### Named Rules

**The Objects Cast Shadows Rule.** Seuls les objets du jeu portent une ombre : couvercle, tranche sortie, fiche, pastille, étiquette, écharpe, phénix, bouton d'export. Un panneau, un champ ou une puce reste plat.

**The Grain Rule.** Le couvercle porte un grain de bruit fractal en `soft-light` à 35 % ; le tapis porte un grain blanc à 7 %. Tout nouveau fond de l'un ou l'autre monde garde son grain.

## Shapes

Des formes de carton imprimé : coins doux mais nets, filets intérieurs plutôt que bordures extérieures. Sur l'affiche, la couverture a `--u * 1.4` de rayon, le bandeau de pictos et la face latérale `--u * 1.2`, l'onglet de pôle et le filet doré `--u * 0.6`. Les bordures de l'affiche sont presque toutes des `box-shadow: inset` (filet royal ou électrique du rebord, filet `pole-light` de l'onglet et des pictos, liseré or). Les cercles sont réservés aux pictos, à la pastille (inclinée à -8°) et au médaillon. Deux éléments sont posés de biais en spécial : l'écharpe à 38° qui coupe le coin haut droit, l'étiquette titre à -2°.

Dans l'éditeur : 12px pour les cartes et boutons, 10px pour les champs, 8px pour les contrôles internes, 999px pour les puces, 4px côté dos pour les tranches, 3px pour le couvercle, 18px pour la fiche sur mobile.

## Components

### Buttons

Peu nombreux, francs, en graisse 800.

- **Shape:** coins de 12px (`rounded.card`).
- **Primary:** PNG, fond `violet`, texte blanc, padding 12px 10px, 15px, interlettrage 0.04em, ombre « bouton principal ». Survol : `#8a2ae6` et montée de 1px ; appui : descente de 1px et ombre réduite.
- **Secondary:** JPG et PDF, fond blanc, bordure 1.5px `sheet-ink`, survol `sheet-2`. La grille d'export est `1.4fr 1fr 1fr`.
- **Disabled:** opacité 0.6, curseur `progress` pendant l'export.
- **Ghost:** « Réinitialiser », transparent, `sheet-muted`, 13px 600, survol `sheet-2`.
- **Focus:** contour 2px `hod-orchid`, décalage 2px, partout.

### Chips

- **Style:** suggestions d'exemples et de prix ; transparentes, bordure 1.5px `sheet-line`, `sheet-muted`, 13px 600, rayon 999px.
- **State:** survol bordure `violet` ; choisie fond et bordure `sheet-ink`, texte blanc.

### Cards / Containers

- **Cartes d'édition** (Hebdo / Spéciale): blanc, bordure 1.5px `sheet-line`, rayon 12px, padding 12px, icône SVG `violet`, nom en Anybody 850. Choisie : fond `hod-deep`, texte `#d9c8f2`, icône orchidée ; la Spéciale choisie ajoute un filet intérieur or de 2px et son icône passe à l'or.
- **Cartes de format**: blanc, rayon 12px, une vignette rectangulaire aux proportions du format (rayon 2px, `sheet-line`), libellé et dimensions tabulaires. Choisie : bordure `violet`, fond `#faf6ff`, vignette `violet`.
- **Blocs de fiche**: `fieldset` séparés par un filet de 1px `sheet-line`, légende en Anybody `violet`. L'en-tête et la barre d'export sont bornés par un filet de 2px `sheet-ink`.

### Inputs / Fields

- **Style:** fond blanc, bordure 1.5px `sheet-line`, rayon 10px, padding 10px 12px, 15px, curseur `hod-electric`. Le `select` porte un chevron SVG à droite.
- **Hover:** bordure `#c3afe0`.
- **Focus:** bordure `violet` et halo `0 0 0 3px rgba(122,31,209,0.18)`.
- **Libellés:** 13px 700 ; indication « optionnel » ou compteur à droite en `sheet-muted`, tabulaire.

### Segmented controls

- **Style:** rail `sheet-2`, padding 4px, rayon 12px ; boutons 13px 700 transparents, rayon 8px.
- **Choisi:** blanc avec ombre légère (mode de date). Les jours de la semaine choisis passent en `violet` plein, texte blanc.

### Navigation: l'étagère de tranches

Sept tranches de boîte verticales de 72px, chacune dans la couleur `base` de son pôle avec un capuchon « HOD » `hod-deep` (9px 800, 0.16em) et le nom court en Anybody condensé à la verticale. Survol : la tranche glisse de 6px. Choisie : elle sort de 24px avec une ombre portée. Transition 260ms `cubic-bezier(0.16, 1, 0.3, 1)`. Sur mobile, les tranches se couchent en onglets de 52px de haut, la choisie monte à 60px.

### Signature: le couvercle d'affiche

- **En-tête (`maker`):** dé d20 orchidée, « Heaven of Dice » blanc, « présente » ou « présente une édition spéciale » en petits caractères orchidée ; à droite l'onglet du pôle (aplat `--pole`, filet `--pole-light`).
- **Couverture:** aplat `--pole`, motif SVG du pôle (grille de go, cartes en éventail, dés et pions, carte hex, règle de tir, jetons, lune et yeux). En hebdo le motif est atténué à 16 % sous le titre par un masque en dégradé. En spécial : gerbe de rayons cristallins (pôle + électrique + royal + orchidée) et 46 éclats, motif du pôle en `luminosity` à 60 % (95 % en normal pour Société et Wargames), médaillon `pole-deep` cerclé d'or.
- **Phénix:** `logo.png` en illustration de couverture, jamais recoloré.
- **Pastille de coin:** cercle de `--u * 15` incliné à -8°, `hod-deep` bordé `--pole-light` en hebdo, or bordé blanc en spécial.
- **Écharpe (spécial):** bande or à 38°, « Édition spéciale » encadrée de deux étincelles SVG.
- **Bandeau de pictos:** 2 à 4 cellules (quand, horaires, lieu, entrée), chacune un cercle-icône SVG trait 2px et une valeur blanche 800 ; séparateurs lilas à 14 %.
- **Pied (`lip`):** « HOD · Association de jeux de société » et la référence de collection.

### Motion

- **Réimpression du couvercle:** à chaque changement de pôle, d'édition ou de format, le couvercle se dévoile de haut en bas (`clip-path`) en partant surexposé, 520ms `cubic-bezier(0.16, 1, 0.3, 1)`. Désactivé avec `prefers-reduced-motion`, comme les transitions des tranches et du cadre.
- **États de contrôle:** 160 à 180ms sur la même courbe.

## Do's and Don'ts

### Do:

- **Do** encadrer chaque affiche du rebord `hod-deep` avec son filet intérieur (`hod-royal` en hebdo, `hod-electric` en spécial).
- **Do** exprimer toute dimension d'affiche en `calc(var(--u) * N)` pour qu'elle tienne dans les six formats.
- **Do** ajouter un pôle en complétant les sept valeurs de `src/data/poles.ts` et en lui dessinant un motif SVG dans `motifs.tsx`.
- **Do** dessiner les icônes en SVG inline, trait 2px `currentColor`, extrémités arrondies, sur le modèle de `icons.tsx`.
- **Do** réserver l'or (`hod-gold`) et les éléments de biais (écharpe, étiquette) à l'édition spéciale.
- **Do** teinter les ombres d'affiche en violet nuit (`rgba(20, 6, 43, …)`).

### Don't:

- **Don't** composer un « titre centré sur photo floue + bloc d'infos » : la couverture est un aplat illustré, jamais une photo.
- **Don't** poser la couleur du pôle sur le rebord : le rebord reste violet HOD, la couleur du pôle reste dans la couverture et ses pièces (onglet, pictos, face latérale).
- **Don't** employer `violet` (le violet d'action de l'éditeur) sur une affiche, ni un `hod-*` comme couleur d'action de l'éditeur.
- **Don't** donner une taille fixe au titre d'affiche ou le passer dans une autre police qu'Anybody.
- **Don't** recolorer ou recadrer le phénix `logo.png`.
- **Don't** ajouter d'ombre à un panneau, un champ ou une puce de l'éditeur.
