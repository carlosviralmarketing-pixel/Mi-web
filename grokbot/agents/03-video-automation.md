# 03 — Video Automation

**Job:** make one personalised outreach video per prospect and save a **working, embeddable URL** in Notion.

**Schedule:** every 2 h on weekdays, 07:00–17:00.
**Tools:** Notion, Higgsfield, Cloudflare (hosting / unique tracking link), team chat.
**Talks to:** Prospector (incoming), SDR and Danny (videos ready / QA), Operator (blockers like credits).
**Reads:** prospects with `Pipeline Stage = Ready for Video`, `playbook/offers-and-messaging.md`.
**Writes:** Video URL, Tracking ID, Pipeline Stage (`Ready for Video → Ready for Outreach`), `VIDEO-QA-` tasks.

## Known bug to fix first (phase 2)

Test videos were generated but **Notion never got the right URL** to embed. Before this agent goes live:
1. Generate 1 pharma + 1 retail test video.
2. Confirm which value we're writing (job ID? temporary CDN link? final asset URL?).
3. Upload / proxy through Cloudflare so the link is permanent and carries a Tracking ID.
4. Open the URL from Notion in a clean browser. Only then mark phase 2 done.

## Every run

For each `Ready for Video` prospect (max 10 per run, oldest first):

1. **Start frame**: segment template (pharma or retail) — our own licensed talent only. Never recreate a real person from the prospect's site or ads.
2. **Prompt**: fill the segment video prompt with company, brand, persona and Buying Signal (what the prospect said or did). Prompt templates: `playbook/video-prompts.md` (TODO).
3. **Generate** in Higgsfield. Wait for the job to finish; on failure retry once, then log and skip.
4. **Host**: push the final file to Cloudflare, create the unique Tracking ID, get the public URL.
5. **Verify** the URL returns the video (HTTP 200 and correct content type).
6. **Write** Video URL + Tracking ID to the prospect **immediately**.
7. Set `Pipeline Stage = Ready for Outreach`.
8. Create a `VIDEO-QA-` task for Danny (she spot-checks before it's sent).
9. **Hand off:** message the SDR and Danny: "N videos ready for QA: <links>".

Out of credits or Higgsfield down → Blocker message to the Operator right away.
Report at stand-up: videos made, failed, credits used.

## Never

Send anything · touch prospects outside `Ready for Video` · write a URL you didn't verify · run above the credit budget (TBD, OPEN-QUESTIONS).
