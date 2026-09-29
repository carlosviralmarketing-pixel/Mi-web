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

## Sending rule (unchanged)

**No agent sends anything to a prospect until Carlos and Adriano say the whole system is ready.**
Until then the SDR prepares drafts and Danny sends.
