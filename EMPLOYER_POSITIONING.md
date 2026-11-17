# Make the portfolio easier to hire from

The most useful change is making your work inspectable quickly. A more distinctive logo helps recognition; evidence of your contribution does more to support a hiring decision.

## What changed in this revision

- A shorter opening identifies the AI Engineer role, names you, and puts the completed Macquarie qualification beside the call to action.
- Smart Financial Assistant, Healthcare NLP and ROS2 Robot Vision lead the project selection, as requested. Dates that were not supplied remain unset.
- Each has a case study showing the problem, contribution, architecture, engineering choices and evidence boundaries.
- Truuth remains visible as industry evidence, with its debugging story and bounded 40/40 evaluation result.
- A project index, branded blog, RSS feed and Markdown workflow make the site easier to grow without pretending unfinished work is already published.

## Highest-impact next steps

1. **Record the work.** Add a short real walkthrough for each university project. Show the financial assistant's state flow, the NLP interface and the physical robot. A recording is useful when models/hardware prevent an always-on demo. Approximately 60–90 seconds is a practical target, not a rule.
2. **Make code easy to inspect.** Supply the exact Financial Assistant and ROS2 repositories. Pin the three university projects on GitHub. Each README should explain the problem, your contribution, architecture, setup, evaluation and one real limitation. Healthcare NLP already has a direct repository link.
3. **Publish actual evaluation evidence.** Explain the 36 financial-assistant trials and their outcomes. For NLP, add dataset/split and task-specific scores only when measured. For ROS2, show the actual behaviour and recovery paths. Counts and diagrams are useful, but do not replace observed behaviour.
4. **Build the agent/MCP gap deliberately.** A bounded LangGraph + MCP application with tests, a live demo and a trace would add evidence that is not yet in the supplied work. Do not add those tools as existing experience merely for keywords.
5. **Make ownership explicit.** For every university/team project, identify your own implementation and evaluation work. Confirm client and employer disclosure details before publishing deeper screenshots or internals.

These priorities are my interpretation of your evidence and the sampled job requirements. For example, [Deloitte's Sydney AI role](https://jobs.deloitte.com.au/job/Sydney-Senior-Consultant-AI-and-Data-NSW/1369811966/) asks for tested Python systems, agent/tool integration, evaluation, deployment and communication. It is a senior role used as a skills reference, not a claim that its seniority matches your experience.

## Blog strategy

Write about problems your target readers can recognise, using your own work. A daily short note can work if each contains a useful observation; publish deeper pieces when you have enough evidence. Avoid filling the schedule with generic AI summaries.

Useful first topics, to write and verify yourself:

- Why small document edits disappeared in a vision encoder.
- How a finite-state machine controlled a multilingual LLM conversation.
- What the 36 dialogue trials actually tested.
- Bringing BioBERT/ClinicalBERT tasks into an inspectable Streamlit application.
- Connecting a classifier to a physical robot's four-state loop.
- A reproducible failure you found, changed and retested.

Use one clear question, one example, what you tried, what happened and the limits. Link to the related project and a runnable example where available. End with a concrete discussion question. Share the published link in places where the topic is relevant; no messages are sent automatically by this site.

[Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) prioritises original, useful information and first-hand expertise. Publishing frequently is not a substitute for those qualities, and traffic does not guarantee employer interest.

## Measure the useful actions

On Vercel, enable Web Analytics and custom events if supported by your plan. The site records non-identifying events for project opens, article opens, resume actions, repository opens and successful enquiries. Compare these actions with visits rather than adding decorative engagement counters.

The goal is a simple path: identify your role → inspect relevant work → verify code/demo/evidence → download the resume or contact you.
