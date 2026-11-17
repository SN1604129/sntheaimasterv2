# Portfolio analysis — Sudipta Nath

Prepared 18 November 2026. This analysis precedes implementation. Personal achievements come only from the supplied brief. Recommendations below describe future work, not experience to claim now.

## 1. Hiring-market gap analysis

### Evidence and limits

This is a focused sample of Sydney-compatible engineering ads, not a statistical survey. Senior roles indicate engineering expectations; they are not a recommendation to position an internship graduate as a senior engineer. Ads can close after this review.

- [Deloitte — Senior Consultant AI and Data, Sydney, posted 3 November 2026](https://jobs.deloitte.com.au/job/Sydney-Senior-Consultant-AI-and-Data-NSW/1369811966/): describes LangGraph agent orchestration, MCP tools, guardrails, automated releases, model monitoring and evaluation. The role joins AI work with ordinary software delivery and stakeholder communication.
- [10x Labs — AI Engineer, Newcastle or Sydney](https://job-boards.anz.greenhouse.io/10xlabs/jobs/4004756201): seeks engineers able to integrate and evaluate LLMs against operational workloads, build agent workflows, and test against historical data or simulation before delivery. Its client-facing setting makes working software and clear communication especially relevant.
- Google ADK is an explicit target in the supplied brief. This limited primary-source sample establishes agent SDK, MCP and delivery expectations, but does not establish how often ADK specifically is requested in Sydney. Treat ADK as a role-specific extension, not a universal hiring requirement.

Framework references: [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview), [Google ADK documentation](https://google.github.io/adk-docs/). Use one framework well before attempting several.

### Evidence-to-requirement map

| Requirement | Evidence already supplied | Missing or weak portfolio evidence | Priority |
| --- | --- | --- | --- |
| Applied LLM engineering | Truuth's Python, Qwen3-VL-235B, Bedrock Converse and multimodal document pipeline; local LLaMA/Mistral assistant | Public, sanitised architecture and an inspectable engineering narrative | High: package existing work first |
| Agent orchestration: LangGraph / LangChain / ADK | Financial assistant's finite-state dialogue controller | No supplied evidence of an agent SDK, tool execution, persistence or recovery. An FSM alone does not establish autonomous agent experience | High |
| MCP and tool integration | REST APIs among skills | No implemented MCP server/client supplied; authentication, tool schemas, permissions and timeouts are unproven | High |
| Retrieval engineering | RAG component in Truuth | Chunking, index, ranking, source grounding and retrieval-specific evaluation details were not supplied | High |
| Evaluation and testing | 12 forensics versions with false-positive/negative regression tracking; 36 assistant trials | Public test fixtures, reproducible commands, failure taxonomy, dataset boundaries and CI enforcement | High; existing work is a differentiator |
| Cloud deployment | AWS Bedrock use; live Stix Eatery platform | Bedrock inference is not evidence of owning service deployment. Hosting architecture, API auth, secrets, rollback and monitoring are unspecified | High |
| CI/CD and maintainable software | Git/GitHub, Docker and R&D handover documentation | Automated checks, container builds, deployment workflows, typed interfaces and test coverage evidence | High |
| Operational reliability | A concrete model-failure diagnosis | Published latency/cost measurements, retry behaviour, rate limits, logs and traces not supplied | Medium-high |
| ML Engineer fundamentals | BioBERT/ClinicalBERT work, robot vision, transformers, thesis | Reproducible train/validation/test splits, baselines, saved configs and model/data cards | Medium; useful for ML roles |
| Product delivery and communication | Stix ordering/rewards/admin platform and Truuth handover | Screenshots with permission, precise personal ownership, architecture and client-approved feedback | High for clients |

The headline should lead with AI Engineer and the tested forensics pipeline. Keep the requested agentic-systems positioning, but identify the financial assistant as an FSM-controlled dialogue system. Do not add LangGraph, LangChain, ADK or MCP to the current skills list until there is real work to support them.

### Metric boundaries

- Say: “Final evaluation: 40/40 modified documents detected; zero false positives.” Identify this as a bounded evaluation, not a universal accuracy or production guarantee.
- The number of genuine control documents was not supplied. Do not calculate specificity, overall accuracy or a statistical confidence interval.
- The 36 trials are an evaluation count, not a success rate. Twelve versions are iterations, not deployments.
- The thesis's approximately 92% accuracy requires dataset and split context before becoming a featured metric.

## 2. Highest-impact additions, ranked

Effort estimates are my planning estimates for one engineer who already knows Python. External accounts, approvals and unpredictable model debugging can add time. Complete additions sequentially; they are not part of this website implementation.

### 1 — Turn existing work into inspectable case studies

**Build:** sanitised Truuth architecture, an illustrative synthetic input, a version-by-version evaluation template, and the patch-averaging failure story. Give Stix and the financial assistant equally clear problem/role/result sections. Do not release employer documents, source code or private datasets.

**Why recruiters care:** it shows reasoning, boundaries, measured outcomes and handover ability immediately, using work already completed.

**Suggested stack:** this Next.js portfolio, Markdown/MDX, accessible SVG architecture, small public Python example only where permission permits. Clearly label every synthetic or illustrative visual.

**Effort:** one focused weekend; allow more time for employer/client permission.

### 2 — Ship a bounded agent + MCP project

**Build:** a small-business support triage agent using a synthetic cafe knowledge base. It retrieves policy sources, classifies requests, and proposes an action. A local MCP server exposes read-only `search_policy` and `get_order_status` tools against synthetic fixtures. Add an approval checkpoint before any proposed write, explicit refusal for unknown order identities, tool timeouts and recovery tests. Demonstrate a real MCP transport, not just functions labelled MCP.

**Why recruiters care:** closes the agent-SDK/MCP gap while showing state, tool schemas, failure handling and controlled actions. It also supports the client-service story.

**Suggested stack:** Python, LangGraph, MCP Python SDK/FastMCP, FastAPI, Pydantic, pytest, SQLite fixtures, Docker, GitHub Actions. Use LangChain components if helpful; add a small ADK comparison later only if a target role needs it.

**Effort:** two weekends for a credible tested MVP, rather than a one-afternoon chatbot.

### 3 — Deploy one usable public live demo

**Build:** host the read-only support assistant from addition 2 with sample questions, source citations, an example tool trace and clear sample-data labelling. Keep all fixtures synthetic. Provide a recorded walkthrough if the live service is asleep or rate-limited.

**Why recruiters care:** they can try an application without installing anything. It establishes deployment evidence separately from calling a cloud model API.

**Suggested stack:** Next.js frontend on Vercel; containerised FastAPI service on an appropriate managed container host; server-side model credentials; request size/rate limits, spending cap, health endpoint and redacted structured logs.

**Effort:** one further weekend after the agent works locally. Hosting and inference may incur costs; choose and measure them before launch.

### 4 — Publish an evaluation and CI evidence pack

**Build:** a versioned synthetic test set spanning grounded answers, abstention, tool failures, injection attempts and multilingual paths. Separate retrieval checks from final-answer checks. Publish actual results with model/config identifiers, observed latency and estimated inference cost; preserve failures. Make deterministic regression tests a required CI check and model-dependent evaluation a separate bounded job.

**Why recruiters care:** converts the existing evaluation skill into reproducible engineering evidence and prevents marketing claims from outrunning tests.

**Suggested stack:** pytest, GitHub Actions, JSONL fixtures, optional Ragas or an equivalent evaluator, OpenTelemetry or Langfuse with redacted data, a short evaluation report.

**Effort:** one weekend for initial fixtures, CI and report; expand with observed failures.

### 5 — Make the financial assistant reproducible

**Build:** document the FSM, provide all 36 trial definitions if owned, distinguish the three languages, and show a failure/recovery transcript. Include Ollama model identifiers and commands. No financial-advice or reliability claims beyond measured evidence.

**Why recruiters care:** shows controlled conversation behaviour and makes an existing project easy to inspect without needing large-model hardware immediately.

**Suggested stack:** current Python/Ollama implementation, environment lockfile, pytest, a diagram, synthetic transcripts and a short screen recording.

**Effort:** one to two days if the implementation and trials are organised.

## 3. What to cut or downplay

- Remove the broad agency-first SNAI homepage. Put personal identity, selected engineering work and the resume before services.
- Remove unrelated comic-generator/payment flows and API-key-entry demos from the main hiring journey. They are not among the supplied work to feature.
- Remove stale “currently studying” and “current intern” language. Education completed July 2026; internship completed June 2026. Do not invent its start date.
- Avoid long keyword walls and unsupported “production-ready” claims. Group actual skills by use.
- Keep the thesis and unfinished research below the three featured projects. Mark StressTwinNet as in progress; do not assign unprovided completion dates or NeMA benchmark improvements.
- Keep TRACE distinct from the two published works. Supervision is evidence; publication status and results were not supplied.
- Do not carry forward ForecastAI, patent claims, client counts, uptime, revenue impact or testimonials from old content.
- Publication title/DOI details need confirmation. No publisher homepage should masquerade as a paper link.

## 4. What earns a small-business enquiry

Use a personal voice and explain concrete deliverables: a useful website, a source-grounded assistant, or a scoped prototype. Lead the services proof with Stix Eatery's real ordering/rewards/admin platform and its live URL. Confirm personal ownership and screenshot permission before publishing deeper implementation detail.

Explain the process: enquiry, a free 20-minute call, proposal and quote, then build and handover. Describe what is included in a proposal and handover as your offered process, not past-client evidence. Let people choose budget and timeline without forcing those optional fields. Use a real delivery service for enquiries, an explicit response expectation, and a direct email fallback. Avoid invented fixed pricing, unsupported ROI and fabricated reviews.

Trust also depends on details: working navigation, mobile layouts, readable copy, a real resume, clear data handling and a contact success state that only appears after the delivery provider accepts the submission. The Web3Forms key must be registered to the supplied Gmail address; the recipient is configured by that account/key, not an arbitrary client-side `to` field.

## 5. GitHub hygiene checklist

Apply to every public project; record private-project limits openly.

- [ ] README opens with the problem, intended user and one concrete outcome.
- [ ] State personal role, collaborators and ownership; distinguish coursework, research and client work.
- [ ] Architecture diagram shows data, models, tools, interfaces and deployment boundaries.
- [ ] Results include dataset/trial size, split or protocol, baselines and limitations; no unsupported metrics.
- [ ] Reproducible setup includes supported runtime, locked dependencies, `.env.example` and commands.
- [ ] One copy-paste path runs a small fixture without private data or paid credentials when feasible.
- [ ] Tests cover meaningful failure paths; CI checks run on pull requests.
- [ ] Include an actual screenshot or short GIF with an accessible caption and permission to publish.
- [ ] Pin the three strongest repositories; use consistent names, descriptions and relevant topics.
- [ ] No secrets, customer records, employer files or model weights without redistribution rights.
- [ ] Add a license where ownership permits, plus model/data provenance and resource requirements.
- [ ] Include known limitations, current status and a working demo/recording link where available.

| Project | Specific evidence to add |
| --- | --- |
| Truuth | Permission-safe case study, synthetic visual, evaluation protocol/control count, failure story, handover scope; no promised public employer code |
| Stix Eatery | Live URL, personal ownership, permitted desktop/mobile screenshots, stack and ordering/rewards/admin boundaries |
| Smart Financial Assistant | FSM diagram, Ollama setup, multilingual sample transcripts, 36-trial definitions and actual results |
| Healthcare NLP | Existing repository, tab overview, model/dataset licenses, NER/relation/summarisation examples and run command |
| ROS2 robot | Hardware and ROS distro, classifier setup, four-state diagram, real robot recording and recovery behaviour |
| NeMA-LC / NeMA-Lite | Separate architecture/configuration details, baselines, reproducible commands and actual status; no invented gains |
| StressTwinNet | Explicit in-progress status, data/modality provenance, subject-split protocol and current milestone |
| Infectious-disease recognition | Dataset, held-out split and approximately 92% accuracy context; model and training setup |
| TRACE | Supervisory attribution, method diagram and permitted code; verify research status and result claims |

## Implementation decision

Build the requested Next.js App Router + TypeScript + Tailwind portfolio in the existing workspace for Vercel. Keep all authored profile, project, service and publication content under `content/`, including the MDX article. Build real navigation, evidence-bounded case studies, accessible theme switching and a Web3Forms integration that handles missing configuration honestly. Use original synthetic vector diagrams rather than employer data. Include a fact-based generated resume PDF and mark it for owner review. Keep missing factual details in an explicit TODO list.
