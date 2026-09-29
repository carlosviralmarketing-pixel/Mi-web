# PPL Sales OS: consolidated plan

Grok Bot + Claude · 29 Sep 2026 · **Consolidated. Once Carlos approves it, this replaces both earlier plans.**

This merges Grok Bot's "PPL Sales OS: current plan" with Claude's `PLAN-CLAUDE.md`.
Where the two plans disagreed, the choice and the reason are listed in section 10.

---

## 1. Goal

Win clients by booking calls. The method: send each prospect a personalized outreach video. Everything else serves that.

## 2. Principles

1. **Build one bot at a time.** The next one starts only after the current one works.
2. **One bot, one job.** Each bot gets a short playbook, only the tools it needs, a schedule or trigger, and a clear report.
3. **Start clean.** The old Notion rules and routines are not a source. Only ideas that worked get carried over, rewritten cleanly.
4. **Keep it simple.** No extra layer until something real needs it.
5. **No outreach is sent to anyone without human approval.**
6. **Notion first, then report.** A bot writes each result to Notion as soon as it's done, then reports. Bot memory is never the record.
7. **Fallback:** if a bot doesn't work, that step goes back to Daniela by hand in Notion.

## 3. Where things live (one place each, no mirrors)

| What | Where |
|---|---|
| Instructions: playbooks, criteria, cadences, messages | **GitHub `yosoycarlos48-oss/ppl-sales-os-grokbot` (private)** — the single source of truth |
| Leads, companies, results | **Notion** (CRM only). The existing PPL Prospects data (907 people) stays; nothing gets deleted |
| Planning and review | Claude, as the shared second brain for Carlos, Grok Bot and Claude |
| Old routines (Daniela's signal sweep, PPL AMOS) | Keep running so Daniela can keep sending. Turned off only once the new Prospector is proven |

Claude's earlier draft files (`carlosviralmarketing-pixel/Mi-web`, folder `grokbot/`) are **reference material only**.
Anything worth keeping gets rewritten into `ppl-sales-os-grokbot`; the Mi-web folder is then archived so there's never a second source.

## 4. The team (build order)

| Order | Bot | Job | Status |
|---|---|---|---|
| 1 | **Prospector** | Finds new accounts and contacts, scores them, saves them to Notion. For now it also carries the ICP and scoring criteria | In build |
| 2 | **Automations** | Personalized video (Higgsfield), saves a **verified, working** URL + tracking ID to Notion; meeting briefings | Planned |
| 3 | **SDR** (bot + Daniela) | Replies first, then follow-ups due today, then new outreach. The bot drafts; Daniela approves and sends | Planned |
| 4 | **Admin** | End-of-day wrap-up, CRM sync (Gmail/LinkedIn vs Notion), dashboard | Planned |
| — | **Sales Intelligence Manager** | Owns the criteria. Lives inside the Prospector's playbook for now; becomes its own bot when the SDR produces reply data worth learning from | Later |
| — | **Grok Bot (operator)** | Coordinates the bots and reports to Carlos | Now |

## 5. How the bots communicate (grows with the team)

| When | How |
|---|---|
| **Now (1 bot)** | Each run ends with a report to Grok Bot, who reports to Carlos |
| **From bot 2 on** | One Grok Bot group chat ("PPL Outreach"). Bots hand off work directly with `@Bot`: e.g. Prospector → Automations "8 leads ready: <links>". One thread per batch or approval. Limit: ~6 bots per group chat |
| **From the SDR on** | **Daily 08:00 stand-up** run by Grok Bot: each bot posts yesterday / today / blocked, with numbers from Notion. Plus a Slack channel **#ppl-grokbot** for the humans: stand-up summary, drafts waiting for Daniela, videos to QA, meetings booked, blockers |

Message rules: one owner and one ask per message; talk to the bot that owns it; answer by the next run; decisions end up in Notion (about a lead) or GitHub (about a rule).
Not WhatsApp: there's no native connector, so it would mean one more vendor seeing prospect data.
Known Grok Bot limit: **no trigger on incoming email**, so the SDR checks the inbox on a schedule.

## 6. Step 1: Prospector

**Job:** each week, find new companies and contacts that fit PPL and save them to Notion.

**What it looks for:**
- **Pharma:** smaller biotech and pharma, especially rare disease, in Phase 3, close to launch (PDUFA), or facing patent expiry. Leads with a current, dated signal come first. Big pharma only with a launch or patent-expiry trigger. Pharma agencies are out of scope (Adriano's network).
- **Retail:** ecommerce-led fashion brands, 50–2,000 employees, needing on-model imagery, **US-headquartered first**. Public AI signal comes first. Excluded as too big: Zara, H&M, Mango, ASOS, Zalando, Shein.
- **People:** the buyers, Director level or above, up to 5 per company.
  - Pharma: Brand/Marketing, Patient Advocacy, Digital/AI.
  - Retail: Ecommerce, AI/Tech, Creative, Marketing, Founder.

**Where it searches:** Exa first, then Clay for LinkedIn and email.

**Where it saves:** Notion PPL Prospects, after a duplicate check (same LinkedIn, email or company).
- It writes each row as soon as the row is complete.
- It fills only empty fields and never overwrites existing data.

**Fields it fills:** Name · Company · Brand (pharma) · Segment · Persona · Title · LinkedIn URL · Email · Email Status (`Verified` only if Clay verified it) · Fit Score · Tier · Buying Signal + evidence link · Pipeline Stage = `New`.

**Score (v1):** keep the existing 0–100 rubric so new leads compare with the 907 already scored.

| Axis | Pts |
|---|---|
| Category fit | 30 |
| Timing | 25 |
| Contact | 20 |
| AI pain | 15 |
| Whitespace | 10 |

- **Simplification:** the contact axis uses seniority only for v1 (C-level 20 → Director 10).
- **Tiers:** Hot ≥ 78 · Warm 62–77 · Cool 45–61 · Cold < 45.

**Rules:**
- Every signal needs the link where it was found. No evidence, no signal.
- A guessed email is never marked as verified.
- It sends no messages.
- It stays under a search budget per run (section 7).

**Report at the end of each run:**
- How many companies and contacts it found, and how many duplicates it skipped.
- The top 5 and why.
- Credits used.
- Anything that failed.

**Plan:**
1. Write the one-page playbook in `ppl-sales-os-grokbot`.
2. Connect Exa and Clay.
3. Test run: **5 new pharma accounts**. Review the results together and measure the cost per account.
4. If it works: set the budget from the measured cost and schedule it weekly.

## 7. Open decisions for Step 1: recommendations

| Decision | Recommendation | Why |
|---|---|---|
| Who writes the playbook | **Claude drafts it, Grok Bot adapts it to its real tools and runs it, Carlos approves the merge** | Whoever writes it isn't the one grading its own work, and Grok Bot knows its connectors best |
| Exa and Clay accounts | **The accounts the old signal sweep already uses**, if Adriano agrees | No new setup. But both routines draw on the same credits, so the budget must cover both |
| Score | **Keep the 0–100 rubric, with the contact axis simplified** | New and old leads stay comparable. Only the fiddly part gets simplified |
| Weekly run | **Tuesday morning** (Carlos's time zone) | Leads land early in the week for the SDR. Monday stays free for review |
| Search budget | **Test run: max 10 Exa searches and 25 Clay lookups, no enrichment beyond email.** Weekly cap is set after the test from the measured cost per account | Better to measure the cost than to guess it |

## 8. What comes after (kept from Claude's plan, for later steps)

These are parked and get detailed only when their bot is next:

- **Lead flow in Notion:** `New → Ready for Video → Ready for Outreach → In Cadence → Replied → Meeting Booked → Won / Lost / Nurture`, with one owner bot per stage.
- **Extra Notion fields needed from step 2:** Track · Pipeline Stage · Cadence Step · Next Action · **Next Action Date** (drives the SDR's to-do list) · **Video URL** · **Tracking ID** · Last Touch · Owner · Do Not Contact.
- **Known video bug to fix first in step 2:** the URL never reached Notion. The bot must verify the link opens before saving it.
- **Cadence:** 8 steps, ~4 per channel. LinkedIn invite → email + video → LinkedIn + video → follow-ups on days 4, 8, 12 and 13. It stops on any reply.
- **Offers:**
  - Retail: "Book a demo, get your first campaign free."
  - Pharma: licensed patients and KOLs, with the pilot scope defined in the meeting. No pre-built deliverables (MLR risk).
- **Data clean-up of the 907:** Brand, Email Status, Track and Score gaps. It doesn't block the Prospector, but it must be done before the SDR starts.

## 9. Open questions for later steps

| # | Question | Step |
|---|---|---|
| 1 | One email account per bot: which addresses? Does the SDR bot draft from Daniela's inbox or its own? | SDR |
| 2 | Does the video go on email **and** LinkedIn? | SDR |
| 3 | Daily caps: LinkedIn invites and emails per inbox | SDR |
| 4 | Higgsfield credit budget per video and per week | Automations |
| 5 | What was saved in Notion instead of the video URL in the failed test? | Automations |
| 6 | Retail message templates (currently in Notion) → rewrite into GitHub | SDR |
| 7 | "$300" pharma special: who qualifies, and what's included? | SDR |
| 8 | LinkedIn access for the SDR bot, and how much risk we accept on automated actions | SDR |

## 10. What changed from each plan

| Topic | Grok Bot plan | Claude plan | Consolidated |
|---|---|---|---|
| Number of bots now | 4 + Grok Bot as operator | 6 (separate Operator and SIM) | **Grok Bot's version.** Grok Bot is the operator; the SIM lives in the Prospector playbook for now |
| Build order | Prospector first | Data clean-up first | **Prospector first.** Clean-up happens before the SDR |
| Source of rules | Fresh, in GitHub | Imported from the old Notion spec | **Fresh, in `ppl-sales-os-grokbot`.** Claude's files are reference only |
| Communication | Report to Grok Bot | Group chat + stand-up + Slack from day 1 | **Grows with the team** (section 5) |
| Old routines | Keep running until the Prospector is proven | Not covered | **Grok Bot's version** |
| Briefings | Automations | Admin | **Automations** |
| Score | Keep or simplify? | Full rubric | **Keep the rubric, simplify the contact axis** |
| Notion first, then report | Not covered | Yes | **Added** as principle 6 |
| Fallback to Daniela | Not covered | Yes | **Added** as principle 7 |
