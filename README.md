# HOD Ads

Générateur d'affiches pour les évènements de l'association Heaven of Dice.

Chaque affiche est le couvercle d'une boîte de jeu de la collection HOD : couleur du pôle en aplat, motif propre au pôle, phénix HOD, bandeau de pictos (date ou récurrence, horaires, lieu, entrée).

## Lancer

```bash
npm install
npm run dev
```

Build statique (dossier `dist/`, déployable sur n'importe quel hébergement statique) :

```bash
npm run build
npm run preview
```

## Utilisation

1. Choisir le pôle dans l'étagère à gauche.
2. Choisir les assos partenaires éventuelles (bloc « Partenariat », une ou plusieurs).
3. Remplir la fiche : nom de l'évènement, édition (hebdo ou spéciale), date unique / récurrence / texte libre, horaires, lieu, description, prix.
4. Choisir le style : « Boîte » (couvercle illustré) ou « Sobre » (fond clair, gros titre).
5. Choisir le format : Instagram (4:5, 1:1, story 9:16), écran (Full HD 16:9 1920 × 1080, Embed Discord 1600 × 800) ou impression (A4 portrait, A4 paysage, 300 dpi).
6. Exporter en PNG, JPG ou PDF.

La fiche est mémorisée dans le navigateur entre deux visites.

## Pôles

| Pôle                   | Couleur     |
| ---------------------- | ----------- |
| Jeux de Réflexion      | Blanc cassé |
| TCG                    | Bleu        |
| Jeux de société        | Orange      |
| JDR                    | Bleu / Vert |
| Wargames               | Rouge       |
| Poker                  | Vert        |
| Mensonges et Trahisons | Noir        |

Couleurs, exemples d'évènements et textes par défaut : `src/data/poles.ts`.
Formats d'export : `src/data/formats.ts`.

### Ajouter une asso partenaire

Chaque dossier `src/partners/<id>/` contenant un `partner.ts` apparaît automatiquement dans le bloc « Partenariat ».

1. Créer `src/partners/<id>/` (ex. `src/partners/rebirth/`) et y mettre le logo en PNG transparent, recadré au plus près.
2. Y créer `partner.ts` :

```ts
import { definePartner } from "../define";
import logo from "./logo.png"; // logo pour fond sombre (style Boîte)
import logoOnLight from "./logo-light.png"; // facultatif : logo pour fond clair (style Sobre)

export default definePartner({
  name: "Mon asso",
  colors: { main: "#145da0", soft: "#b9d1f9" }, // accent + pastel du halo en style Sobre
  logo,
  logoOnLight,
  // chip: '#3d0a24',     // sans logoOnLight : pastille derrière le logo sur fond clair (défaut colors.main)
  // shadow: '#050a30',   // ombre légère du logo sur fond clair
  // watermark,           // image de filigrane, coin bas gauche en style Sobre (pas en paysage)
});
```

Les options sont décrites dans `src/partners/define.ts`. Voir `src/partners/wave/` pour un exemple complet.

## Logo

Le logo est `src/assets/logo.png` (640 px de large). Pour l'impression A4 à 300 dpi, remplacer ce fichier par une version haute définition (au moins 2000 px de large, PNG transparent) ou un SVG en gardant le même nom.
