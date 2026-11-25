import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { domains, investigationStages, personas } from "@/lib/site-data";
import { StatusTag } from "./ui";

export function BioNetwork({ className }: { className?: string }) {
  const nodes = [
    { x: 60, y: 150, l: "Gut microbiome", c: "var(--verify)" },
    { x: 190, y: 70, l: "Metabolites", c: "var(--verify)" },
    { x: 320, y: 160, l: "Immune regulation", c: "var(--primary)" },
    { x: 440, y: 70, l: "Inflammatory signalling", c: "var(--signal)" },
    { x: 540, y: 180, l: "Neuroimmune", c: "var(--helix)" },
  ];
  return (
    <div className={cn("relative rounded-xl border border-border bg-card/40 p-4", className)}>
      <StatusTag s="Illustrative" className="absolute right-4 top-4" />
      <svg viewBox="0 0 600 240" className="w-full" role="img" aria-label="Illustrative network from gut microbiome to neuroimmune interactions">
        {nodes.slice(1).map((n, i) => {
          const p = nodes[i]!;
          return <line key={i} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke="var(--muted-foreground)" strokeWidth="1.2" className="animate-dash" />;
        })}
        {nodes.map((n, i) => (
          <g key={n.l}>
            <circle cx={n.x} cy={n.y} r="16" fill={n.c} opacity=".15" className="animate-node" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={n.x} cy={n.y} r="6" fill={n.c} />
            <text x={n.x} y={n.y + 34} textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="var(--font-mono)">{n.l}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground">Illustrative mapping — not a verified causal conclusion.</p>
    </div>
  );
}

export function InvestigationDemo() {
  const [i, setI] = useState(0);
  const s = investigationStages[i]!;
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ol className="space-y-1" aria-label="Investigation stages">
        {investigationStages.map((st, k) => (
          <li key={st.t}>
            <button onClick={() => setI(k)} aria-current={k === i} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors", k === i ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-accent")}>
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px]", k === i ? "border-primary text-primary" : "border-border")}>{k + 1}</span>
              {st.t}
            </button>
          </li>
        ))}
      </ol>
      <div className="rounded-xl border border-border bg-card/60">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-muted-foreground/40" /><span className="size-2.5 rounded-full bg-muted-foreground/40" /><span className="size-2.5 rounded-full bg-muted-foreground/40" /></div>
          <span className="font-mono text-xs text-muted-foreground">investigation / gut-brain-axis / stage {i + 1}</span>
          <StatusTag s="Illustrative" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{s.t}</h3>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-background/70 p-5 font-mono text-sm leading-relaxed text-foreground/90">{s.o}</pre>
          {i === 3 && <BioNetwork className="mt-6" />}
          <div className="mt-6 flex gap-2">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-40">Previous</button>
            <button disabled={i === investigationStages.length - 1} onClick={() => setI(i + 1)} className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-40">Next stage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const dotColor: Record<string, string> = { primary: "bg-primary", helix: "bg-helix", verify: "bg-verify", signal: "bg-signal" };

export function DomainTabs() {
  const [k, setK] = useState(0);
  const d = domains[k]!;
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {domains.map((x, j) => (
          <button key={x.key} role="tab" aria-selected={j === k} onClick={() => setK(j)} className={cn("flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors", j === k ? "border-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground")}>
            <span className={cn("size-2 rounded-full", dotColor[x.color])} />{x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-8 grid gap-8 rounded-xl border border-border bg-card/50 p-8 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">{d.name}</h3>
          <p className="mt-3 text-muted-foreground">{d.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">{d.ids.map((id) => <span key={id} className="rounded border border-border bg-background px-2 py-1 font-mono text-xs">{id}</span>)}</div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Example research questions</p>
          <ul className="mt-3 space-y-3">{d.questions.map((q) => <li key={q} className="border-l-2 border-primary/50 pl-4 text-sm">{q}</li>)}</ul>
          <Link to="/science" className="mt-6 inline-block text-sm text-primary hover:underline">Explore all domains →</Link>
        </div>
      </div>
    </div>
  );
}

export function PersonaTabs() {
  const [k, setK] = useState(0);
  const p = personas[k]!;
  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr]">
      <div role="tablist" className="flex flex-col gap-1">
        {personas.map((x, j) => (
          <button key={x.key} role="tab" aria-selected={j === k} onClick={() => setK(j)} className={cn("rounded-lg px-4 py-3 text-left text-sm", j === k ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-accent")}>{x.name}</button>
        ))}
      </div>
      <div role="tabpanel" className="rounded-xl border border-border bg-card/50 p-8">
        <h3 className="text-2xl font-semibold">{p.name}</h3>
        <p className="mt-3 text-signal">Challenge: <span className="text-muted-foreground">{p.pain}</span></p>
        <ul className="mt-6 space-y-3">{p.value.map((v) => <li key={v} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-verify" />{v}</li>)}</ul>
      </div>
    </div>
  );
}

export function ContradictionPanel() {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-sm">Claim under review: <span className="text-foreground">“Butyrate reduces neuroinflammation.”</span></p>
        <StatusTag s="Illustrative" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-verify/40 bg-verify/5 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-verify">Supporting evidence</p>
          <p className="mt-3 text-sm">Murine models (n≈14 studies): reduced microglial activation after oral butyrate.</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs text-muted-foreground"><dt>Model</dt><dd>Mouse, male</dd><dt>Dose</dt><dd>High, chronic</dd><dt>Timing</dt><dd>Pre-insult</dd></dl>
        </div>
        <div className="rounded-lg border border-signal/40 bg-signal/5 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">Conflicting evidence</p>
          <p className="mt-3 text-sm">Smaller studies (n≈3): no effect or increased inflammatory markers.</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs text-muted-foreground"><dt>Model</dt><dd>Mouse, mixed sex</dd><dt>Dose</dt><dd>Low, acute</dd><dt>Timing</dt><dd>Post-insult</dd></dl>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-border bg-background/60 p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Contextual assessment</p>
        <p className="mt-2 text-sm text-muted-foreground">Disagreement is plausibly explained by dose, timing and sex — not necessarily contradiction. Human evidence is absent. <span className="text-foreground">Confidence: low · Requires expert review.</span></p>
      </div>
    </div>
  );
}
