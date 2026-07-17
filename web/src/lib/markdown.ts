export function downloadMarkdown(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export function buildKickoffMarkdown(data: {
  projet: string
  date: string
  facilitateur: string
  probleme: string
  succes: string
  horsScope: string
  notes: string
}) {
  return `# Checklist kickoff

**Projet :** ${data.projet || '—'}  
**Date :** ${data.date || '—'}  
**Facilitateur :** ${data.facilitateur || '—'}  

## Objectif

- [x] Problème métier formulé en 1–2 phrases
- [x] Résultat attendu (definition of success)
- [x] Hors scope explicite

**Problème :** ${data.probleme || '—'}

**Succès :** ${data.succes || '—'}

**Hors scope :** ${data.horsScope || '—'}

## Parties prenantes

- [ ] Sponsor nommé
- [ ] Utilisateurs cibles identifiés
- [ ] Contact technique / ops identifié
- [ ] RACI draftée

## Cadre de travail

- [ ] Rythme (ex. sprint 2 semaines)
- [ ] Outil de suivi choisi
- [ ] Canal de communication (Slack / Teams / email)
- [ ] Fréquence des syncs client

## Contraintes

- [ ] Date cible / jalons
- [ ] Budget / capacité
- [ ] Accès (comptes, données, environnements)
- [ ] Conformité / sécurité si applicable

## Livrables kickoff

- [ ] Backlog initial (10–20 items max)
- [ ] Risques initiaux
- [ ] Prochain rendez-vous planifié

## Notes

${data.notes || '_…_'}
`
}

export function buildStatusMarkdown(data: {
  projet: string
  periode: string
  auteur: string
  destinataires: string
  resume: string
  fait: string
  prevu: string
  decisions: string
}) {
  return `# Rapport de statut (hebdo)

**Projet :** ${data.projet || '—'}  
**Période :** ${data.periode || '—'}  
**Auteur :** ${data.auteur || '—'}  
**Destinataires :** ${data.destinataires || '—'}  

## En une phrase

${data.resume || '_Où en est le projet aujourd’hui ?_'}

## Avancement

| Jalons / objectifs | Statut | Commentaire |
|--------------------|--------|-------------|
| | Vert / Orange / Rouge | |

## Fait cette période

${data.fait || '- …'}

## Prévu prochaine période

${data.prevu || '- …'}

## Risques & besoins

| Sujet | Sévérité | Besoin (décision / accès / budget) |
|-------|----------|-------------------------------------|
| | H/M/L | |

## Décisions demandées au sponsor

${data.decisions || '1. …'}
`
}
