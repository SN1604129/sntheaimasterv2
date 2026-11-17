export const services = [
  {
    number: "01",
    icon: "window" as const,
    title: "AI-Powered Websites",
    formValue: "AI website",
    summary:
      "A clear, useful website built around what your customers need to do.",
    deliverables: [
      "A responsive website shaped around your business",
      "Enquiry and customer journeys with clear next steps",
      "Scoped AI features and integrations where they add value",
      "Deployment and a practical handover",
    ],
  },
  {
    number: "02",
    icon: "workflow" as const,
    title: "Custom AI Assistants & Agents",
    formValue: "AI chatbot/agent",
    summary:
      "Help customers find answers and help your team move work forward.",
    deliverables: [
      "RAG chatbots grounded in your approved information",
      "Support agents or workflow automation with defined boundaries",
      "Agreed evaluation examples and failure handling",
      "Integration scope and ongoing costs explained upfront",
    ],
  },
  {
    number: "03",
    icon: "code" as const,
    title: "AI Prototypes & Consulting",
    formValue: "Custom AI project",
    summary:
      "Find out what is useful and feasible before committing to a larger build.",
    deliverables: [
      "A clearly scoped problem and feasibility review",
      "A working prototype against agreed examples",
      "Technical options, constraints and evaluation findings",
      "Recommendations and documentation for the next step",
    ],
  },
];

export const process = [
  {
    title: "Enquiry",
    description:
      "Tell me about your business, the problem and what you want to improve.",
  },
  {
    title: "Free 20-min call",
    description:
      "We clarify the scope, practical constraints and whether I can help.",
  },
  {
    title: "Proposal & quote",
    description:
      "You get deliverables, a timeline and a quote to review before work starts.",
  },
  {
    title: "Build & handover",
    description:
      "We review the work against the agreed scope, then cover deployment and handover.",
  },
];

export const enquiry = {
  serviceOptions: [
    "AI website",
    "AI chatbot/agent",
    "Custom AI project",
    "Other",
  ],
  budgetOptions: ["Under $1k", "$1–3k", "$3–10k", "$10k+", "Not sure"],
  timelineOptions: ["ASAP", "1–3 months", "Flexible"],
  success: "Thanks! I'll reply within 24 hours.",
  subjectPrefix: "New Website Enquiry – ",
};
