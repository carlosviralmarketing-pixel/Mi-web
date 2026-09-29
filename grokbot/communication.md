# How the agents work together

Like a small team: they **talk to each other** and **keep the CRM up to date**. Both, always.

- **Talking** is how work moves: hand-offs, requests, questions, blockers.
- **The CRM (Notion)** is the record. If it isn't in Notion, it didn't happen.

## The golden rule

> **Update Notion first, then send the message.** The message links to the row(s) it's about.

A message without a CRM update is gossip. A CRM update without a message is a hand-off nobody noticed.

## Morning stand-up (daily, 08:00, weekdays)

Hosted by the **Operator**. Every agent attends, in this order: Prospector → Video → SDR → Admin → SIM (Mondays).
Humans (Carlos, Adriano, Danny) are in the same channel and can jump in.

Each agent posts three lines, with numbers taken from Notion, not from memory:

```
Yesterday: <what I did, with counts>
Today:     <what I'll do, with counts>
Blocked:   <what's stopping me and who I need>  (or "nothing")
```

Then the Operator:
1. Resolves what it can on the spot ("Prospector, SDR has 12 leads left, please run a lead batch today").
2. Escalates to a human what it can't (credentials, budget, a rule decision).
3. Posts a 5-line summary for the humans: pipeline counts, replies, meetings booked, blockers, asks.

An agent that doesn't show up to stand-up is treated as down; the Operator flags it.

## During the day: direct messages

Agents message each other directly whenever they need something. Every message is one of these:

| Type | Example | Needs a reply? |
|---|---|---|
| **Hand-off** | Prospector → Video: "8 leads ready for video: <links>" | Ack |
| **Request** | SDR → Prospector: "Only 12 leads left in Ready for Outreach, need ~30 Pharma" | Yes, with ETA |
| **Question** | SDR → SIM: "Is a Cool-tier lead with a fresh PDUFA signal in scope?" | Yes |
| **Blocker** | Video → Operator: "Higgsfield out of credits" | Yes |
| **FYI** | SDR → Admin: "Meeting booked with <name> Thu 3pm" | No |

Rules:
1. **Notion first, then message** (the golden rule).
2. **One owner, one ask.** Say who must do what, by when. No "someone should…".
3. **Talk to the agent who owns it**, not to everyone. The Operator only gets blockers and things nobody owns.
4. **Answer in your next run** at the latest. Unanswered after that → the Operator chases it at stand-up.
5. **Stay in your lane.** You can ask another agent to do *its* job. You can't do it for it, and you can't ask it to break its runbook.
6. **Decisions go somewhere permanent.** If a chat ends in a decision about a lead → Notion. About a rule → the SIM edits the playbook.
7. **Who settles what:** rules and targeting → SIM · priorities and workload → Operator · anything about money, sending, or legal → Carlos / Adriano.
8. **Humans can message any agent** and any agent can message a human. Danny talks to the SDR directly.

## Who talks to whom most

```
SIM ──rules/batch──► Prospector ──leads ready──► Video ──videos ready──► SDR ──meeting booked──► Admin
 ▲                        ▲                                               │
 └──── questions ─────────┴──────────── "need more leads" ────────────────┘
                     Operator: stand-up host, blockers, escalation to humans
```

## Where this happens (Grok Bot + Slack)

Based on the Grok Bot docs (docs.x.ai/grok-bot — "Message and collaborate", "Skills and routines", "Create and manage Bots", FAQ).

### Grok Bot group chat = the office (bots work here)

- One group chat, **"PPL Outreach"**, with the 6 bots: Operator, SIM, Prospector, Video, SDR, Admin.
  Grok Bot allows **max ~6 bots per group chat** (and ~50 per account), so we're exactly at the limit: **don't add a 7th bot to this chat**.
  If we need more later, the extra bot works in a separate chat and the Operator relays.
- Bots in a group chat can pass work, assign ownership and message/trigger each other asynchronously. That's our hand-offs.
- **Mentions:** `@Bot` when one bot owns the ask · several `@` only if each is really needed · `@everyone` only for the stand-up and big updates.
- **Threads:** one thread per result or per approval (e.g. "Video batch 2026-09-29", "Reply from Cole @ Cogent"). Keeps the main chat readable.
- **Stand-up** is a scheduled routine on the Operator (weekdays 08:00) that posts in the group chat and `@everyone`.
- Carlos (and whoever has access) can jump into the chat or a thread any time.

### Slack = where the humans are (summaries, approvals, alerts)

Slack is a native Grok Bot connector and a supported **routine trigger**, so it's the right bridge to the team.
Create one channel, **#ppl-grokbot**, and use it only for:

| What | Posted by | Who reads / acts |
|---|---|---|
| Stand-up summary (5 lines) | Operator | Carlos, Adriano, Danny |
| Drafts waiting for approval (link to thread) | SDR | Danny |
| Videos waiting for QA | Video | Danny |
| Meeting booked + briefing link | Admin | Carlos, Adriano |
| Blockers / escalations | Operator | Carlos, Adriano |

Danny (or anyone) can write in #ppl-grokbot, e.g. "@SDR Cole replied on LinkedIn, draft an answer", and the message triggers the bot's routine.
Detailed bot-to-bot chatter **stays in Grok Bot**, not in Slack.

**Why not WhatsApp:** Grok Bot has no native WhatsApp connector. It needs a third-party bridge (Composio, Albato…), which means another vendor seeing prospect data and another thing that can break. Slack does it natively.

### Grok Bot features we rely on

| Feature | How we use it |
|---|---|
| **Bots** (one per role, own memory) | One bot per runbook in `agents/`. The runbook is the bot's instructions |
| **Skills** (shared across bots) | Playbook procedures: scoring, signal sweep, video generation, cadence step, briefing |
| **Routines — scheduled** | Stand-up, weekly lead run, daily sweep, video batches, SDR runs, end of day |
| **Routines — triggers** | Slack message in #ppl-grokbot; GitHub event (playbook changed → SIM re-reads it) |
| **Approvals** | Bots ask before changing external systems. Every send waits for a human OK |
| **Memory** | Preferences and working notes only. Docs are explicit: memory is not an authoritative source. **Notion is.** |

### Known gap: no email trigger

Grok Bot can't currently run a routine when a new email arrives. So the SDR checks the inbox **on a schedule**
(09:00 and 15:00 — add more slots if replies wait too long). A LinkedIn/email reply is never "noticed" instantly.

## Sending rule (unchanged)

**No agent sends anything to a prospect until Carlos and Adriano say the whole system is ready.**
Until then the SDR prepares drafts and Danny sends.
