# ICP and scoring

Owner: **Sales Intelligence Manager**. The Prospector follows this file; it does not change it.
Sources: *Client Segmentation and Prioritization Strategy* (docs/sales/prospects READMEs, decision notes G96, 2026-08-04, 2026-08-15, 2026-08-23, 2026-09-10).

## Rules for both segments

- Demand side only: buyers, never members or supply.
- Current role only. Re-pull roles and re-check company ownership every quarter (9 of 82 pharma accounts changed owner in one quarter).
- LinkedIn is the first touch. Email only to Clay-verified addresses.
- Personal data: name, title, LinkedIn and business email only. Erasure is honoured.
- Accounts, original leads and new contacts are ranked separately. People and companies are never merged into one list.

---

## Pharma / Biotech

### Which companies

Core: mid-size and specialty pharma plus biotech, **rare disease first** — those launches depend on real patient and caregiver stories, and sourcing them today is fragile on consent. Prefer smaller companies: shorter buying cycle.

Also in scope:
- Large-cap pharma **only** with a launch or patent-expiry trigger.
- Well-funded biotechs not yet selling (pre-commercial).
- Well-funded mid-size pharma.
- Orphan-disease companies.

Main triggers: **Phase 3 / approval decision (PDUFA) coming** → about to launch; **loss of exclusivity** → budget shrinking, needs cheaper, more creative marketing.

Pharma agencies are **out of scope** for the bots (handled through Adriano's network).

Corporate actions: retire an account only when its buying centre truly collapsed into another company. Keep acquired companies that still run their own commercial team (mark down timing and whitespace). Add the acquirers.

### Who inside

| Persona | Why they buy |
|---|---|
| Brand / Marketing / DTC | Owns the creative and the budget |
| Patient Advocacy & Engagement | Second buyer; owns the patient stories |
| Digital, Innovation & Omnichannel (incl. senior AI) | Owns the AI and content pipeline |

Contact selection: rank by function fit → seniority (C-level > SVP/EVP > VP > Exec Dir > Sr Dir > Dir > Assoc Dir) → US/global scope → economic buyer present. Up to 5 per company, never padded.
Exclude juniors; at large-caps also Manager, Specialist, Analyst, HR, Talent. Deprioritise market-access-only and supply-chain "commercial" titles.

### Fit Score (0–100)

| Axis | Pts | Scores high when |
|---|---|---|
| category_fit | 30 | Rare disease, stigmatised conditions, advocacy-driven brands |
| timing | 25 | Active launch, PDUFA coming, budget forming ahead of patent expiry |
| contact | 20 | Named, current, senior economic buyer |
| ai_pain | 15 | AI-creative ambition, or exposure on medical-legal review / content provenance |
| whitespace | 10 | Pre-commercial, no locked agency of record |

Contact axis: base 14 (C-level) down to 6 (Director); +2 verified economic buyer; +1 advocacy persona covered; +1/+2/+3 for 2/4/6+ verified contacts; −3 at large-caps where contacts skew non-US or toward AI engineers. A named senior AI/omnichannel owner adds +1 to +3 on ai_pain.
New contacts inherit their company's axes and earn their own contact score. Contact score ≤ 8 = sourcing backlog, not a verdict on fit.

---

## Retail (fashion ecommerce)

### Which companies

Ecommerce-led fashion brands, ~50–2,000 employees, ~$20M–1B revenue, needing on-model imagery on a recurring basis.
Excluded (too big): Inditex/Zara, H&M, Mango, ASOS, Zalando, Shein. Below ICP (light touch only): Atoir, Selkie, Sheep Inc, Heliot Emil.

Waves: **Wave 1 = US-headquartered** (HQ from Clay's company record, not the domain). Wave 2 = non-US, parked. Why US first: NY Fashion Workers Act, California AI labelling law, founder time zone and network, no GDPR-first outreach before the motion works.

### Priority = how far the brand has gone with AI

| Tier | Meaning |
|---|---|
| P1 | Public AI investment (AI models, virtual try-on, AI personalisation) + fit |
| P2 | Strong fit, digital-forward, AI signal weak or unconfirmed |
| P3 | Fits but smaller or quieter |

Standing rule: brands that adopt AI move up. Size-inclusive brands sit in P2 but have the strongest economics (every style shot on several bodies).
Signal Confidence: `confirmed` · `verify` (must be confirmed before it goes in copy) · `none-yet`.

### Who inside

Ecommerce & Digital · AI / Data / Tech · Creative / Content / Studio · Marketing / Brand · Founder / Exec (economic buyer under 500 people).

---

## Weekly selection (intent layer)

Fit is only a **gate** (Hot or Warm). Four live signals choose the 20–30 contacts to work each week:
role change · public posts about consent or AI · new money · competitor engagement.
Details and scoring thresholds: `playbook/signals.md`.
