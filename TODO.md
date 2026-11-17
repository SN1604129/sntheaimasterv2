# Owner checklist

Every outstanding factual or account-setup placeholder is listed below. Repeated inline TODOs are grouped by the fact they need. Existing evidence is usable without inventing the missing details. The current site is built locally and has not replaced the live domain.

## Delivery and contact

- [ ] **TODO: Web3Forms.** Register and verify a key for `sudipta1604129@gmail.com`, set `NEXT_PUBLIC_WEB3FORMS_KEY` locally and in Vercel, rebuild, and test real Gmail delivery. The form has a truthful email fallback until configured.
- [ ] **TODO: Resume review.** Review the generated one-page `public/Sudipta-Nath-Resume.pdf`. Correct `content/resume.json` and regenerate, or supply your final PDF under the same filename.
- [ ] **TODO: LinkedIn.** Add the confirmed URL in `content/profile.ts`. No guessed link is displayed. When supplied, include it in the chosen public navigation/contact location as well as the Person schema.
- [ ] **TODO: Vercel deployment and DNS.** Import the source, review its deployment, add apex and `www` domains, apply Vercel's exact DNS records and select the canonical redirect. Keep mail DNS records.
- [ ] **TODO: Analytics.** Enable Vercel Web Analytics and confirm your plan supports the `Enquiry submitted` custom event. Verify a non-identifying event after a real successful enquiry.

## Truuth case study

- [ ] **TODO: Public disclosure review.** Confirm permission for the case-study wording and permitted technical detail; employer code and documents are not included.
- [ ] **TODO: Evaluation protocol.** Add the genuine-control count, test protocol and dataset boundaries. Keep the supplied 40/40 modified-document result and zero false positives scoped to that evaluation.
- [ ] **TODO: RAG detail.** Add a permitted description of the retrieval component; do not infer its index, dataset or topology.
- [ ] **TODO: Visual evidence.** Add an approved synthetic before/after example or evaluation artefact. Existing diagrams are explicitly illustrative.

## Stix Eatery case study

- [ ] **TODO: Ownership and dates.** Confirm your exact contribution, delivery dates and collaborators.
- [ ] **TODO: Stack and architecture.** Supply the actual framework/backend, integrations and architecture. Current tags describe ordering, rewards and administration, not an invented technical stack.
- [ ] **TODO: Debugging story.** Supply one real issue, its constraints, the fix and how you verified it.
- [ ] **TODO: Screenshots.** Add client-permitted real screenshots, ideally desktop and mobile. The current visual is a product map.
- [ ] **TODO: Optional client evidence.** Add only client-approved results and a testimonial if one is actually supplied. No metrics or testimonial is required to keep the existing case study truthful.

## Smart Financial Assistant case study

- [ ] **TODO: Exact repository and run instructions.** Replace the explicitly labelled GitHub-profile link with the actual repository and reproducible Ollama/model setup.
- [ ] **TODO: Evaluation.** Document the 36 trials and their measured results, including language-specific behaviour where available. Thirty-six is a trial count, not a pass rate.
- [ ] **TODO: Failure and fix.** Supply a real transcript, the state/inference change, and the check demonstrating the fix.
- [ ] **TODO: Demo evidence.** Add real screenshots or a recording with synthetic dialogue and an explanation of local hardware requirements.

## Additional projects and research

- [ ] **TODO: ROS2.** Add the exact project repository. The current link deliberately goes to your profile.
- [ ] **TODO: NeMA-LC / NeMA-Lite.** Add exact repositories and verified research status. No completion date or benchmark improvement is assumed.
- [ ] **TODO: StressTwinNet.** Add a shareable repository; keep its in-progress status accurate.
- [ ] **TODO: Infectious-disease thesis.** Add its repository, dataset and evaluation split so the reported approximately 92% accuracy has context.
- [ ] **TODO: TRACE.** Confirm current status and add a permitted repository, paper or research link. The known method and Dr. Xi Zheng's supervision are already included.
- [ ] **TODO: IEEE publication.** Add the exact title, author list and DOI/paper URL in `content/research.ts` and the resume source.
- [ ] **TODO: Taylor & Francis publication.** Add the exact title, author list and DOI/paper URL in the same sources. Current paper headings are descriptive labels.

## Blog draft

- [ ] **TODO: Review the placeholder article.** Review the prose against your experience and employer disclosure limits.
- [ ] **TODO: Add evidence.** Supply a synthetic before/after example, permitted input/decision-logic explanation, test protocol, genuine-control count and limitations. These overlap the Truuth evidence tasks above.
- [ ] **TODO: Publish only when ready.** Review the article and use `npm run blog:publish -- article-slug` after editing its MDX and JSON metadata; the publication date, estimated reading time, indexing and sitemap inclusion update automatically.

The ranked future-project recommendations in `PORTFOLIO_ANALYSIS.md` are a separate roadmap. The agent/MCP demo has not been fabricated as existing work.

## University project evidence

- [ ] **TODO: Healthcare NLP.** Add dataset/split information, task-specific evaluation results, contribution boundaries and a real screenshot or walkthrough.
- [ ] **TODO: Physical robot.** Add hardware/ROS2 details, your precise contribution, a real robot recording and the exact repository.

Use `PUBLISHING.md` for daily Markdown publishing and new-project commands. The selected university-project grouping was confirmed by the owner; project-specific dates remain unset until supplied.
