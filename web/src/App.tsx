import { useState } from 'react'
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
    facilitateur: 'Paul EL Khoury',
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
          placeholder="Ex. Clipping Platform MVP"
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
        />
      </label>
      <label>
        Problème métier
        <textarea
          value={form.probleme}
          onChange={(e) => setForm({ ...form, probleme: e.target.value })}
          placeholder="En 1–2 phrases"
        />
      </label>
      <label>
        Définition de succès
        <textarea
          value={form.succes}
          onChange={(e) => setForm({ ...form, succes: e.target.value })}
        />
      </label>
      <label>
        Hors scope
        <textarea
          value={form.horsScope}
          onChange={(e) => setForm({ ...form, horsScope: e.target.value })}
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
        <button className="btn btn-lime" type="submit">
          Télécharger le markdown
        </button>
      </div>
    </form>
  )
}

function StatusForm({ onExport }: { onExport: (md: string) => void }) {
  const [form, setForm] = useState({
    projet: '',
    periode: '',
    auteur: 'Paul EL Khoury',
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
          placeholder="Ex. 07–11 juil. 2026"
        />
      </label>
      <label>
        Auteur
        <input
          value={form.auteur}
          onChange={(e) => setForm({ ...form, auteur: e.target.value })}
        />
      </label>
      <label>
        Destinataires
        <input
          value={form.destinataires}
          onChange={(e) => setForm({ ...form, destinataires: e.target.value })}
        />
      </label>
      <label>
        En une phrase
        <textarea
          value={form.resume}
          onChange={(e) => setForm({ ...form, resume: e.target.value })}
        />
      </label>
      <label>
        Fait cette période
        <textarea
          value={form.fait}
          onChange={(e) => setForm({ ...form, fait: e.target.value })}
          placeholder={'- Item 1\n- Item 2'}
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
          placeholder={'1. …\n2. …'}
        />
      </label>
      <div className="form-actions">
        <button className="btn btn-lime" type="submit">
          Télécharger le markdown
        </button>
      </div>
    </form>
  )
}

function DocPanel({ doc }: { doc: KitDoc }) {
  const [mode, setMode] = useState<'lire' | 'remplir'>('lire')

  return (
    <section>
      <div className="doc-header">
        <div>
          <h1>{doc.title}</h1>
          <p>{doc.blurb}</p>
        </div>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => downloadMarkdown(doc.fileName, doc.content)}
        >
          Télécharger le template
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
            Remplir & exporter
          </button>
        </div>
      ) : null}

      <div className="panel">
        {mode === 'lire' || !doc.fillable ? (
          <MarkdownView content={doc.content} />
        ) : doc.fillable === 'kickoff' ? (
          <KickoffForm
            onExport={(md) => downloadMarkdown(`kickoff-${Date.now()}.md`, md)}
          />
        ) : (
          <StatusForm
            onExport={(md) => downloadMarkdown(`statut-${Date.now()}.md`, md)}
          />
        )}
      </div>
      <p className="footer-note">
        Les fichiers Markdown du repo restent la source de vérité. Cette UI est une vitrine
        interactive pour démontrer le kit.
      </p>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [activeId, setActiveId] = useState('kickoff')
  const active = docs.find((d) => d.id === activeId) ?? docs[0]

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="brand-mark"
          onClick={() => setView('home')}
        >
          <span className="logo-dot">A</span>
          <span>
            <strong>Agile Delivery Toolkit</strong>
            <span>Coordination · Scrum · Livraison client</span>
          </span>
        </button>
        <div className="topbar-actions">
          <a
            className="btn btn-ghost"
            href="https://github.com/pOpO1-9/agile-delivery-toolkit"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn-ghost"
            href="https://github.com/pOpO1-9/clipping-platform-mvp"
            target="_blank"
            rel="noreferrer"
          >
            Clipping MVP
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setView('kit')}
          >
            Ouvrir le kit
          </button>
        </div>
      </header>

      {view === 'home' ? (
        <section className="hero">
          <div className="hero-orb" aria-hidden />
          <div className="hero-copy">
            <h1>Agile Delivery Toolkit</h1>
            <p>
              Un kit FR pour chef de projet IT junior et Scrum Master : templates,
              guides et exemples pour structurer kickoff, sprints et livraison client.
            </p>
            <div className="hero-cta">
              <button type="button" className="btn btn-lime" onClick={() => setView('kit')}>
                Explorer les templates
              </button>
              <a
                className="btn btn-ghost"
                href="https://github.com/pOpO1-9/agile-delivery-toolkit"
                target="_blank"
                rel="noreferrer"
              >
                Voir le repo
              </a>
            </div>
          </div>
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
