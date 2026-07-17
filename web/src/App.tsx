import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { docs, kindLabel, type DocKind, type KitDoc } from './content/catalog'
import {
  buildKickoffMarkdown,
  buildStatusMarkdown,
  downloadMarkdown,
} from './lib/markdown'
import './index.css'

type View = 'home' | 'kit'

const kinds: DocKind[] = ['template', 'guide', 'example']

function MarkdownView({ content }: { content: string }) {
  const html = marked.parse(content, { async: false }) as string
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
}

function KickoffForm({ onExport }: { onExport: (md: string) => void }) {
  const [form, setForm] = useState({
    projet: '',
    date: new Date().toISOString().slice(0, 10),
    facilitateur: '',
    probleme: '',
    succes: '',
    horsScope: '',
    notes: '',
  })

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault()
        onExport(buildKickoffMarkdown(form))
      }}
    >
      <label>
        Projet
        <input
          value={form.projet}
          onChange={(e) => setForm({ ...form, projet: e.target.value })}
          placeholder="Nom du projet"
          required
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </label>
      <label>
        Facilitateur
        <input
          value={form.facilitateur}
          onChange={(e) => setForm({ ...form, facilitateur: e.target.value })}
          placeholder="Votre nom"
        />
      </label>
      <label>
        Problème métier
        <textarea
          value={form.probleme}
          onChange={(e) => setForm({ ...form, probleme: e.target.value })}
          placeholder="En une ou deux phrases"
        />
      </label>
      <label>
        Critère de succès
        <textarea
          value={form.succes}
          onChange={(e) => setForm({ ...form, succes: e.target.value })}
          placeholder="Quand est-ce qu’on considère que c’est bon ?"
        />
      </label>
      <label>
        Hors scope
        <textarea
          value={form.horsScope}
          onChange={(e) => setForm({ ...form, horsScope: e.target.value })}
          placeholder="Ce qu’on ne fait pas maintenant"
        />
      </label>
      <label>
        Notes
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </label>
      <div className="form-actions">
        <button className="btn btn-accent" type="submit">
          Télécharger (.md)
        </button>
      </div>
    </form>
  )
}

function StatusForm({ onExport }: { onExport: (md: string) => void }) {
  const [form, setForm] = useState({
    projet: '',
    periode: '',
    auteur: '',
    destinataires: '',
    resume: '',
    fait: '',
    prevu: '',
    decisions: '',
  })

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault()
        onExport(buildStatusMarkdown(form))
      }}
    >
      <label>
        Projet
        <input
          value={form.projet}
          onChange={(e) => setForm({ ...form, projet: e.target.value })}
          required
        />
      </label>
      <label>
        Période
        <input
          value={form.periode}
          onChange={(e) => setForm({ ...form, periode: e.target.value })}
          placeholder="Semaine du …"
        />
      </label>
      <label>
        Auteur
        <input
          value={form.auteur}
          onChange={(e) => setForm({ ...form, auteur: e.target.value })}
          placeholder="Votre nom"
        />
      </label>
      <label>
        Destinataires
        <input
          value={form.destinataires}
          onChange={(e) => setForm({ ...form, destinataires: e.target.value })}
          placeholder="Sponsor, client, équipe…"
        />
      </label>
      <label>
        En une phrase
        <textarea
          value={form.resume}
          onChange={(e) => setForm({ ...form, resume: e.target.value })}
          placeholder="Où on en est"
        />
      </label>
      <label>
        Fait cette période
        <textarea
          value={form.fait}
          onChange={(e) => setForm({ ...form, fait: e.target.value })}
        />
      </label>
      <label>
        Prévu prochaine période
        <textarea
          value={form.prevu}
          onChange={(e) => setForm({ ...form, prevu: e.target.value })}
        />
      </label>
      <label>
        Décisions demandées
        <textarea
          value={form.decisions}
          onChange={(e) => setForm({ ...form, decisions: e.target.value })}
        />
      </label>
      <div className="form-actions">
        <button className="btn btn-accent" type="submit">
          Télécharger (.md)
        </button>
      </div>
    </form>
  )
}

function DocPanel({ doc }: { doc: KitDoc }) {
  const [mode, setMode] = useState<'lire' | 'remplir'>('lire')

  useEffect(() => {
    setMode('lire')
  }, [doc.id])

  return (
    <section>
      <div className="doc-header">
        <div>
          <p className="eyebrow">{kindLabel[doc.kind]}</p>
          <h1>{doc.title}</h1>
          <p>{doc.blurb}</p>
        </div>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => downloadMarkdown(doc.fileName, doc.content)}
        >
          Télécharger
        </button>
      </div>

      {doc.fillable ? (
        <div className="tabs">
          <button
            type="button"
            className={`tab ${mode === 'lire' ? 'active' : ''}`}
            onClick={() => setMode('lire')}
          >
            Lire
          </button>
          <button
            type="button"
            className={`tab ${mode === 'remplir' ? 'active' : ''}`}
            onClick={() => setMode('remplir')}
          >
            Remplir
          </button>
        </div>
      ) : null}

      <div className="panel">
        {mode === 'lire' || !doc.fillable ? (
          <MarkdownView content={doc.content} />
        ) : doc.fillable === 'kickoff' ? (
          <KickoffForm
            onExport={(md) => downloadMarkdown(doc.fileName, md)}
          />
        ) : (
          <StatusForm
            onExport={(md) => downloadMarkdown(doc.fileName, md)}
          />
        )}
      </div>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState<View>(() => {
    return localStorage.getItem('adt-view') === 'kit' ? 'kit' : 'home'
  })
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem('adt-doc') || 'kickoff'
  })
  const active = docs.find((d) => d.id === activeId) ?? docs[0]

  useEffect(() => {
    localStorage.setItem('adt-view', view)
  }, [view])

  useEffect(() => {
    localStorage.setItem('adt-doc', activeId)
  }, [activeId])

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="brand-mark"
          onClick={() => setView('home')}
        >
          <span className="logo-dot">PK</span>
          <span>
            <strong>Kit de livraison Agile</strong>
            <span>Paul EL Khoury</span>
          </span>
        </button>
        <div className="topbar-actions">
          <a
            className="btn btn-ghost"
            href="https://github.com/pOpO1-9/agile-delivery-toolkit"
            target="_blank"
            rel="noreferrer"
          >
            Code source
          </a>
          <a
            className="btn btn-ghost"
            href="https://github.com/pOpO1-9/clipping-platform-mvp"
            target="_blank"
            rel="noreferrer"
          >
            Projet associé
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setView('kit')}
          >
            Ouvrir
          </button>
        </div>
      </header>

      {view === 'home' ? (
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Île-de-France · coordination de projet</p>
            <h1>Kit de livraison Agile</h1>
            <p>
              Templates et guides que j’utilise pour cadrer un projet : kickoff,
              backlog, sprints, syncs client, risques. En français, prêts à copier
              dans Notion, Confluence ou Jira.
            </p>
            <div className="hero-cta">
              <button type="button" className="btn btn-accent" onClick={() => setView('kit')}>
                Voir les documents
              </button>
              <a
                className="btn btn-ghost"
                href="https://www.linkedin.com/in/paul-el-khoury-8b78081a9"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <aside className="hero-aside" aria-label="Contenu du kit">
            <p className="aside-label">Dans le kit</p>
            <ul>
              <li>9 templates projet</li>
              <li>2 guides pratiques</li>
              <li>2 exemples remplis</li>
            </ul>
            <p className="aside-note">
              Pas un outil SaaS. Des documents à réutiliser.
            </p>
          </aside>
        </section>
      ) : (
        <div className="workspace">
          <aside className="sidebar">
            {kinds.map((kind) => (
              <div className="side-group" key={kind}>
                <h2>{kindLabel[kind]}</h2>
                {docs
                  .filter((d) => d.kind === kind)
                  .map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      className={`side-link ${doc.id === active.id ? 'active' : ''}`}
                      onClick={() => setActiveId(doc.id)}
                    >
                      <strong>{doc.title}</strong>
                      <span>{doc.blurb}</span>
                    </button>
                  ))}
              </div>
            ))}
          </aside>
          <main className="main-pane">
            <DocPanel doc={active} />
          </main>
        </div>
      )}
    </div>
  )
}
