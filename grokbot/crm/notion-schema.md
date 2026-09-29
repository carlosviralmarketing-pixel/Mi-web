# Notion CRM schema

Notion holds **data only**. Rules live in `grokbot/playbook/` in Git.

Existing databases (keep them, do not rebuild):

| Database | Purpose |
|---|---|
| **PPL Prospects** | One row per person (907 as of 2026-09-29) |
| **PPL Triggers** | Dated, evidenced buying signals, linked to prospects |
| **PPL Tasks** | Work items for Danny / the SDR (follow-ups, replies, lead requests, video QA) |
| **Signal sweep — run log** | Page `3e7411eb002481b8b8cfd496431fd92c` |
| **Signal sweep — spec** | Page `3e7411eb002481e595f5dd4475608768` (to be moved into `playbook/signals.md`) |

Current counts:

| Segment | People | Companies | In Active Batch |
|---|---|---|---|
| Pharma | 510 | 93 | 82 |
| Fashion / Retail | 367 | 85 | 26 |
| Biotech + Rare Disease | 26 | 24 | 16 |

## PPL Prospects — required fields

Phase 0 is done when every **Active Batch** row has every field marked *required*.

| Field | Type | Required | Values / notes | Written by |
|---|---|---|---|---|
| Name | title | yes | | Prospector |
| Company | text / relation | yes | | Prospector |
| Brand | text | yes (pharma) | Product brand, e.g. drug name. Extract from Buying Signal if empty | Prospector |
| Segment | select | yes | `Pharma` · `Biotech` · `Retail` | Prospector |
| Persona | select | yes | See `playbook/icp-and-scoring.md` | Prospector |
| Title | text | yes | Current role only | Prospector |
| LinkedIn URL | url | yes | | Prospector |
| Email | email | no | Clay-verified only | Prospector |
| Email Status | select | yes | `Verified` · `Unverified` · `None` · `Not eligible` | Prospector |
| LinkedIn Status | select | yes | `Not connected` · `Request pending` · `Connected` · `Not eligible` | SDR |
| Fit Score | number 0–100 | yes | Rubric in `playbook/icp-and-scoring.md` | Prospector |
| Tier | formula | — | Hot ≥78 · Warm 62–77 · Cool 45–61 · Cold <45 | formula |
| Priority | select | yes | `P1` · `P2` · `P3` | Prospector |
| Track | select | yes | Campaign / cadence, e.g. `Pharma — general`, `Pharma — signal`, `Retail — US W1` | Prospector |
| Buying Signal | text | no | Latest signal summary | Prospector |
| Active Batch | checkbox | — | Only SIM decides who is in the batch | SIM |
| Pipeline Stage | select | yes | See below | whoever owns the stage |
| Cadence Step | number 0–8 | yes | 0 = not started | SDR |
| Next Action | text | no | Plain sentence | SDR |
| Next Action Date | date | no | Drives the SDR's "pending actions" | SDR |
| Video URL | url | no | Must be the public/embeddable URL, not a job ID | Video Automation |
| Tracking ID | text | no | Cloudflare unique ID for the video page | Video Automation |
| Last Touch | date | no | | SDR |
| Owner | select | yes | `Danny` · `SDR bot` | SDR |
| Do Not Contact | checkbox | — | Terminal. Nobody writes to this row after it is set, except erasure | anyone |

## Pipeline Stage (one owner per stage)

```
New ──► Ready for Video ──► Ready for Outreach ──► In Cadence ──► Replied ──► Meeting Booked ──► Won / Lost
 │        (Video Automation)   (SDR)                (SDR)          (SDR)       (Admin)
 └─ Prospector
```

| Stage | Owner | Moves to next when |
|---|---|---|
| New | Prospector | Required fields filled and Fit Score ≥ 62 (Warm or Hot) |
| Ready for Video | Video Automation | Video URL and Tracking ID written and opened successfully |
| Ready for Outreach | SDR | First touch sent (Cadence Step = 1) |
| In Cadence | SDR | Prospect replies, or cadence finishes (→ Lost / Nurture) |
| Replied | SDR | Meeting booked, or not interested (→ Lost) |
| Meeting Booked | Admin | Meeting held; outcome recorded |
| Won / Lost / Nurture | — | Terminal for this cycle |

## PPL Tasks

| Field | Values |
|---|---|
| Task Key | Prefix = who created it: `SIGNAL-`, `CADENCE-`, `REPLY-`, `VIDEO-QA-`, `LEAD-REQ-`, `BRIEF-` |
| Type | `Reply` · `Follow-up` · `First touch` · `Video QA` · `Lead Request` · `Briefing` · `Escalation` |
| Prospect | relation |
| Trigger | relation (optional) |
| Due | date |
| Operator | who does it: `Danny` · `SDR bot` · `Carlos` · `Adriano` |
| Status | `Open` · `Done` · `Cancelled` |
| Draft | Message text, first line `DRAFT` until approved |

## Run logs

One Notion page per agent (or one shared page with a column for the agent). Format of each line:

```
2026-09-29 09:04 | SDR | ok | replies 2, follow-ups 5, first touches 8, tasks 3 | <notes or error>
```

Status is `ok`, `partial` or `failed`. A missing line counts as `failed` for the Operator.
