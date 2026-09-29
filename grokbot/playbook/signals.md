# Buying signals (daily signal sweep)

Owner: **Sales Intelligence Manager**. Executed by: **Prospector**.
Source: *Daily Signal Sweep Routine* (spec version 2026-09-26.6). The detailed method still lives on the Notion page
"Signal sweep — spec" (`3e7411eb002481e595f5dd4475608768`). **TODO:** copy its Part 1 here, then archive the Notion page. Rules live in one place only.

## Goal

Using Notion, Exa and Clay, find **new, dated, evidenced** buying signals at today's rotation slice of Pharma and Retail accounts in PPL Prospects.
Write them to PPL Triggers, refresh each prospect's Buying Signal, and create `SIGNAL-` tasks for Danny where the cadence allows a message now.

## Budget per run (cost control — stop and log when any is hit)

- Today's rotation slice only (~25 accounts).
- ≤ 3 sub-agents · ≤ 15 full web pages opened · ≤ 15 new triggers · ≤ 10 new tasks.
- ≤ 25 Clay searches, **no enrichment credits**. Exa ≤ 5 results with short highlights.
- Send Exa and Clay only company names and role keywords — never a person's email or profile URL.
- Query Notion for only the columns you need.

## Evidence rule

No trigger without an evidence URL **you opened** plus a **verbatim quote** from it. A news roundup or aggregator is never enough on its own.
Re-check existing triggers only if their evidence is a roundup or aggregator.

## Task gate

Create a `SIGNAL-` task only if **all** are true:
- Prospect is in Active Batch and not Do Not Contact, Lost, Won or erased.
- Linked trigger's stored score gives **Pharma Intent ≥ 12** or **Retail ≥ 24**.
- Cadence allows a message now (decide from Cadence Step, LinkedIn Status and Next Action only):
  - no task if a prepared/approved note is already waiting to be sent;
  - no task if a LinkedIn request is still pending;
  - no task if awaiting a reply or in conversation;
  - after a first message, frame the task as the follow-up.

Task content: the signal, why now, the ask, the leave-behind, and a draft whose first line is `DRAFT`. Operator = Danny.
Cancel open `SIGNAL-` tasks for anyone who became Do Not Contact / Lost / Won / erased, and for any discarded or expired trigger.

## Writes allowed

PPL Triggers · Buying Signal field of PPL Prospects · PPL Tasks rows whose Task Key starts `SIGNAL-`.
Never: send messages, edit stage / cadence / Operator / Next Action, create prospects, campaigns or trigger types, change schemas, delete anything.

## End of run

Message Danny and the SDR with links to any `SIGNAL-` tasks created. Report at stand-up, even when nothing was found or something failed.
