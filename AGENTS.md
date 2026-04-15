<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# mp3 — Yoonet Marketplace

Public-facing productised-services marketplace. Next.js 16, no database, no auth,
no environment variables. Fully static + client state + a Formspree POST.

## Mental model

The marketplace is a **catalogue**, not a calculator. Every offering is a
defined container with a scoped deliverable, an intake form and a price.
The intake does the filtering — declining out-of-container requests is a
feature, not a failure.

Two lanes:

- **Ongoing** — monthly subscription. Sums into the basket, enforces a
  `$600/mo` floor before `Start my subscription` enables.
- **One-off** — flat list of quote requests. No minimum.

Tasks stick to `localStorage` under `mp3-basket-v1`. Refresh restores them.

## Where to edit what

| Change | File |
|---|---|
| Add or edit a service (name, bullets, pricing, boundaries, intake fields) | `src/lib/catalog.ts` |
| Add or edit a cluster (Infrastructure / Growth / Managed) | `src/lib/clusters.ts` |
| Intake field definitions (labels, validation, help text) | `src/lib/intake-fields.ts` |
| Persona templates (`/?p=<id>` deep links) | `src/lib/personas.ts` |
| Submission payload shape, Formspree endpoint, floor value | `src/lib/submission.ts` |
| Client-side validation rules | `src/lib/validate-task.ts` |
| Basket state, dedupe logic, persona preset loader | `src/components/basket/basket-context.tsx` |
| Service card layout / cluster layout / sticky rail wiring | `src/components/service-catalog.tsx` |
| Intake dialog (pick request → fill fields) | `src/components/task-builder-dialog.tsx` |
| Review → contact → submit dialog | `src/components/submission-dialog.tsx` |
| Sticky basket: subscription section, quote section, floor bar | `src/components/sticky-basket.tsx` |
| Hero copy | `src/components/hero.tsx` |
| FAQ copy | `src/components/faq.tsx` |
| Fit gate (for/against list) | `src/components/fit-gate.tsx` |
| How we work (3 phases) | `src/components/how-we-work.tsx` |
| Final CTA | `src/components/cta-section.tsx` |
| Header nav | `src/components/site-header.tsx` |
| Root metadata and fonts (Inter + Manrope) | `src/app/layout.tsx` |
| Global palette, shadows, animations | `src/app/globals.css` |

## Invariants — do not break

- **No database of any kind.** All data is static TypeScript.
- **No auth, no `middleware.ts`, no `proxy.ts`.** Fully public.
- **No environment variables.** `FORMSPREE_ENDPOINT` is a public, hardcoded
  constant. Swap the literal string in `src/lib/submission.ts` if the
  endpoint changes.
- **Formspree is the backend.** Submissions are POSTed from the client
  bundle. No API routes.
- **Never persist contact info** to `localStorage` — only basket tasks.
- **Dedupe ongoing tasks by `serviceId`** when calculating the monthly
  subtotal. Two SEO Growth tasks = one SEO Growth subscription.
- **Every service needs ≥1 request type** in `catalog.ts`. The intake
  dialog crashes if a service has an empty `requestTypes` array.
- **Subscription floor is `$600/mo`.** Defined once in
  `src/lib/submission.ts:ONGOING_FLOOR_AUD`.
- **Design system stays Inter + Manrope** with the blue/pink/cyan palette
  defined in `src/app/globals.css`.

## How the basket flow works

1. User lands → `BasketProvider` mounts → hydrates `localStorage` → applies
   `?p=<persona>` if the basket is empty.
2. User clicks "Add task" on a service card → `TaskBuilderDialog` opens.
3. Step 1: pick a request type (service-boundary decline shown below).
4. Step 2: fill the request type's intake fields → `addTask()` pushes the
   task into the correct lane based on `service.lane`.
5. Sticky basket updates with the new task. Floor progress bar recalculates.
6. User clicks `Start my subscription` or `Request a quote` →
   `SubmissionDialog` opens → review → contact → POST to Formspree →
   `clearLane(lane)` on success.

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
vercel --yes              # preview
vercel --prod --yes       # production
```

No env vars to configure. Zero build secrets.
