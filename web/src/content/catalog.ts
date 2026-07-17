import kickoff from '@kit/templates/01-checklist-kickoff.md?raw'
import backlog from '@kit/templates/02-backlog.md?raw'
import sprintPlan from '@kit/templates/03-planification-sprint.md?raw'
import syncNotes from '@kit/templates/04-compte-rendu-sync.md?raw'
import sprintReview from '@kit/templates/05-revue-de-sprint.md?raw'
import retro from '@kit/templates/06-retrospective.md?raw'
import statusReport from '@kit/templates/07-rapport-statut.md?raw'
import risks from '@kit/templates/08-registre-risques.md?raw'
import raci from '@kit/templates/09-matrice-raci.md?raw'
import playbook from '@kit/guides/playbook-livraison-client.md?raw'
import ceremonies from '@kit/guides/ceremonie-scrum.md?raw'
import caseStudy from '@kit/examples/etude-de-cas-mvp.md?raw'
import sprintExample from '@kit/examples/exemple-sprint-2-semaines.md?raw'

export type DocKind = 'template' | 'guide' | 'example'
export type FillableId = 'kickoff' | 'status'

export type KitDoc = {
  id: string
  kind: DocKind
  title: string
  blurb: string
  content: string
  fillable?: FillableId
  fileName: string
}

export const docs: KitDoc[] = [
  {
    id: 'kickoff',
    kind: 'template',
    title: 'Checklist kickoff',
    blurb: 'Lancer un projet avec objectif, parties prenantes et contraintes clairs.',
    content: kickoff,
    fillable: 'kickoff',
    fileName: '01-checklist-kickoff.md',
  },
  {
    id: 'backlog',
    kind: 'template',
    title: 'Backlog produit',
    blurb: 'Prioriser les items avec critères d’acceptation.',
    content: backlog,
    fileName: '02-backlog.md',
  },
  {
    id: 'sprint-plan',
    kind: 'template',
    title: 'Planification de sprint',
    blurb: 'Objectif, capacité, sélection et Definition of Done.',
    content: sprintPlan,
    fileName: '03-planification-sprint.md',
  },
  {
    id: 'sync',
    kind: 'template',
    title: 'Compte rendu de sync',
    blurb: 'Avancées, blocages, focus du jour.',
    content: syncNotes,
    fileName: '04-compte-rendu-sync.md',
  },
  {
    id: 'review',
    kind: 'template',
    title: 'Revue de sprint',
    blurb: 'Démo, feedback et validation explicite.',
    content: sprintReview,
    fileName: '05-revue-de-sprint.md',
  },
  {
    id: 'retro',
    kind: 'template',
    title: 'Rétrospective',
    blurb: 'Start / Stop / Continue + 3 actions max.',
    content: retro,
    fileName: '06-retrospective.md',
  },
  {
    id: 'status',
    kind: 'template',
    title: 'Rapport de statut',
    blurb: 'Point hebdo pour sponsor / client.',
    content: statusReport,
    fillable: 'status',
    fileName: '07-rapport-statut.md',
  },
  {
    id: 'risks',
    kind: 'template',
    title: 'Registre des risques',
    blurb: 'Probabilité, impact, mitigation, owner.',
    content: risks,
    fileName: '08-registre-risques.md',
  },
  {
    id: 'raci',
    kind: 'template',
    title: 'Matrice RACI',
    blurb: 'Qui fait, qui décide, qui est consulté / informé.',
    content: raci,
    fileName: '09-matrice-raci.md',
  },
  {
    id: 'playbook',
    kind: 'guide',
    title: 'Playbook livraison client',
    blurb: 'Avant, pendant, avec le client, clôture.',
    content: playbook,
    fileName: 'playbook-livraison-client.md',
  },
  {
    id: 'ceremonies',
    kind: 'guide',
    title: 'Cérémonies Scrum',
    blurb: 'Daily, affinage, planif, revue, rétro.',
    content: ceremonies,
    fileName: 'ceremonie-scrum.md',
  },
  {
    id: 'case-study',
    kind: 'example',
    title: 'Étude de cas MVP',
    blurb: 'Récit de livraison d’un MVP clipping multi-rôles.',
    content: caseStudy,
    fileName: 'etude-de-cas-mvp.md',
  },
  {
    id: 'sprint-example',
    kind: 'example',
    title: 'Exemple sprint 2 semaines',
    blurb: 'Objectif, sélection, syncs, revue, actions rétro.',
    content: sprintExample,
    fileName: 'exemple-sprint-2-semaines.md',
  },
]

export const kindLabel: Record<DocKind, string> = {
  template: 'Templates',
  guide: 'Guides',
  example: 'Exemples',
}
