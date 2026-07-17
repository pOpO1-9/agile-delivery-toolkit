# Agile Delivery Toolkit

Kit de livraison Agile pour **chef de projet IT junior**, **Scrum Master** ou **coordinateur de delivery**.

Objectif : montrer concrètement comment on structure un projet — kickoff, backlog, sprints, sync client, risques, clôture — avec des templates réutilisables en français.

## Pour qui

- Candidats qui veulent prouver une capacité de **coordination** (pas seulement du code)
- Équipes produit / IT qui démarrent un projet sans process formalisé
- Contextes client : startups, éditeurs logiciels, missions de conseil

## Contenu

```
agile-delivery-toolkit/
├── README.md
├── guides/
│   ├── playbook-livraison-client.md
│   └── ceremonie-scrum.md
├── templates/
│   ├── 01-checklist-kickoff.md
│   ├── 02-backlog.md
│   ├── 03-planification-sprint.md
│   ├── 04-compte-rendu-sync.md
│   ├── 05-revue-de-sprint.md
│   ├── 06-retrospective.md
│   ├── 07-rapport-statut.md
│   ├── 08-registre-risques.md
│   └── 09-matrice-raci.md
└── examples/
    ├── etude-de-cas-mvp.md
    └── exemple-sprint-2-semaines.md
```

## Comment l’utiliser

1. Copier le dossier `templates/` dans votre espace projet (Notion, Confluence, repo Git…).
2. Remplir le kickoff + RACI avant le premier sprint.
3. Tenir backlog + risques à jour chaque semaine.
4. Produire un rapport de statut court pour le sponsor / client.
5. Clôturer chaque sprint avec revue + rétro actionnable.

## Parcours type (2 semaines)

| Jour | Activité | Template |
|------|----------|----------|
| J0 | Kickoff + RACI | `01`, `09` |
| J1 | Affinage backlog | `02` |
| J1–J2 | Planification sprint | `03` |
| Quotidien | Sync courte (standup) | `04` |
| Mi-sprint | Point risques / statut | `07`, `08` |
| Fin sprint | Revue + rétro | `05`, `06` |

## Exemple portfolio

Voir `examples/etude-de-cas-mvp.md` : récit de livraison d’un MVP produit (inspiré d’un projet clipping multi-rôles).

## Auteur

**Paul EL Khoury** — ingénieur logiciel avec expérience delivery client (simulation, Unreal, produit startup).  
Objectif : postes junior en **coordination de projet**, **chef de projet IT** ou **Scrum Master** en Île-de-France.

## Interface web (vitrine)

Une UI légère lit les Markdown du repo (source de vérité) et permet de :

- parcourir templates / guides / exemples
- remplir kickoff + rapport de statut
- télécharger le `.md` généré

### Pour non-techniques (1 clic)

- **Lien public :** [Ouvrir le kit en ligne](https://popo1-9.github.io/agile-delivery-toolkit/)
- **Sur ce PC :** double-cliquer `Ouvrir-le-kit.bat` (nécessite Node.js installé une fois)

### En local (dev)

```bash
cd web
npm install
npm run dev
```

## Licence

MIT — libre de réutiliser et d’adapter.
