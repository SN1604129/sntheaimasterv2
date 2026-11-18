import additions from "./project-additions.json";

export type ProjectLink = { label: string; href: string };
export type ArchitectureStep = { title: string; detail: string };
export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  group: "University" | "Industry" | "Client";
  featured?: boolean;
  featuredOrder?: number;
  published?: boolean;
  outcome: string;
  summary: string;
  tags: string[];
  visual: "forensics" | "stix" | "education" | "dialogue" | "healthcare" | "robot";
  problem: string[];
  role: string[];
  architecture: ArchitectureStep[];
  architectureNote: string;
  challenge: { title: string; paragraphs: string[]; confirmed: boolean };
  results: { value: string; label: string }[];
  resultNote: string;
  links: ProjectLink[];
  linkNote?: string;
  todos: string[];
};

const coreProjects: Project[] = [
  {
    slug: "truuth-document-forensics",
    group: "Industry",
    number: "01",
    title: "Truuth Document Forensics Pipeline",
    shortTitle: "Finding the edits a vision model missed.",
    category: "Multimodal AI · Industry internship",
    outcome:
      "All 40 modified documents detected in the final evaluation, with zero false positives.",
    summary:
      "A Python pipeline combining image forensics, PDF structural analysis, multimodal inference and a RAG component. The real engineering challenge was making small document edits visible to the system.",
    tags: ["Python", "AWS Bedrock", "Qwen3-VL-235B", "RAG", "Evaluation"],
    visual: "forensics",
    problem: [
      "Document tampering can be visually subtle. A small modified region can disappear inside an otherwise plausible page, making document-level multimodal inference an unreliable signal on its own.",
      "The pipeline needed to combine complementary evidence and track both missed modifications and false alarms as the approach evolved.",
    ],
    role: [
      "As an AI Engineer Intern at Truuth, I built a Python document-forensics pipeline using Error Level Analysis heatmaps, PDF structural analysis and Qwen3-VL-235B through the AWS Bedrock Converse API, with a RAG component.",
      "I automated benchmarking across 12 versions, tracked false positives and false negatives as regression tests, investigated model failure and wrote R&D handover documentation. The internship concluded in June 2026.",
    ],
    architecture: [
      { title: "Document input", detail: "Document images and PDFs" },
      {
        title: "Forensic signals",
        detail: "ELA heatmaps + PDF structural analysis",
      },
      {
        title: "Multimodal reasoning",
        detail: "Qwen3-VL-235B · Bedrock Converse · RAG component",
      },
      {
        title: "Decision & evaluation",
        detail: "Decision logic + versioned regression checks",
      },
    ],
    architectureNote:
      "Simplified conceptual architecture based on the supplied project description. All displayed documents and signals are synthetic; no employer data or proprietary implementation is reproduced.",
    challenge: {
      title: "The signal was getting lost before the prompt could help.",
      confirmed: true,
      paragraphs: [
        "The vision encoder’s patch averaging diluted fine-grained tampering signals. Small edits were being blended into the surrounding page representation.",
        "I changed the inputs and the decision logic rather than relying only on prompt changes. This addressed the information reaching the model and how the pipeline used the evidence.",
        "Automated evaluation across 12 versions made regressions visible. The debugging lesson: inspect the representation and the surrounding system when a model misses a small but important signal.",
      ],
    },
    results: [
      { value: "40/40", label: "modified documents detected" },
      { value: "0", label: "false positives in final evaluation" },
      { value: "12", label: "versions benchmarked" },
    ],
    resultNote:
      "These are the supplied final evaluation results, not a claim of universal accuracy. The number of genuine control documents and the full evaluation protocol have not been supplied. Specificity and overall accuracy are therefore not calculated.",
    links: [],
    linkNote:
      "Industry project. Employer code and documents are not published here. I can discuss the engineering approach using non-confidential examples.",
    todos: [
      "TODO: Confirm permission for the public Truuth case study and the level of technical detail shown.",
      "TODO: Add the genuine-control document count, evaluation protocol and permitted description of the RAG component.",
      "TODO: Add an approved synthetic before/after example or evaluation artefact; current visuals are illustrative.",
    ],
  },
  {
    slug: "stix-eatery",
    group: "Client",
    number: "02",
    title: "Stix Eatery Platform",
    shortTitle: "AI-assisted delivery for a real Sydney cafe.",
    category: "Client delivery · AI-assisted development",
    outcome:
      "Online ordering, rewards, admin tools and chatbot support, built with AI-assisted development.",
    summary:
      "Used AI-assisted tools to build and refine a cafe platform, bringing ordering, loyalty, chatbot support and business administration into one delivery.",
    tags: ["AI-assisted development", "Chatbot integration", "Ordering & loyalty", "Admin tools"],
    visual: "stix",
    problem: [
      "Stix Eatery is a cafe in Miranda, NSW. The platform brings together online ordering, rewards and loyalty, and administration.",
      "The work connects a real business's customer and staff workflows with a usable website and chatbot support.",
    ],
    role: [
      "Used AI-assisted development tools to implement and iterate on the Stix Eatery web platform.",
      "Built the ordering, rewards/loyalty and administration experience, and implemented chatbot support and AI-assisted tools around the business workflows.",
      "The AI work supports a live business product: customer ordering and loyalty alongside the tools used to administer the platform.",
    ],
    architecture: [
      { title: "AI-assisted build", detail: "Implementation and iteration with AI-assisted tools" },
      { title: "Customer website", detail: "Online ordering + rewards and loyalty" },
      { title: "Chatbot integration", detail: "Conversational support within the client solution" },
      { title: "Business tools", detail: "Administration and day-to-day platform management" },
    ],
    architectureNote:
      "Conceptual view of the AI-assisted build process and the customer/business capabilities it delivers. The illustration is a product map rather than a screenshot of the live site.",
    challenge: {
      title: "Connecting AI-assisted implementation with a useful business workflow.",
      confirmed: false,
      paragraphs: [
        "AI-assisted development supported the implementation of ordering, loyalty and administration. Chatbot integration became part of the broader client solution.",
        "The delivery brings the website, conversational support and business tools together around the cafe's everyday workflows.",
      ],
    },
    results: [
      { value: "Live", label: "business website" },
      { value: "Chatbot", label: "integrated support capability" },
      { value: "AI-assisted", label: "development and delivery" },
    ],
    resultNote:
      "A live client platform for Stix Eatery in Miranda, NSW, combining customer-facing features, chatbot support and business administration.",
    links: [{ label: "Visit Stix Eatery", href: "https://stixeatery.com.au" }],
    todos: [
      "TODO: Document the specific AI development tools, chatbot provider and implementation stack.",
      "TODO: Add a client-approved delivery example, screenshots and measured business outcomes when available.",
    ],
  },
  {
    slug: "smart-financial-assistant",
    group: "University",
    featured: true,
    featuredOrder: 1,
    number: "03",
    title: "Smart Financial Assistant",
    shortTitle: "Multilingual dialogue, with deliberate control.",
    category: "LLM applications · Conversational systems",
    outcome:
      "An FSM-controlled LLM dialogue system in English, Bengali and Hindi, with 36 automated evaluation trials.",
    summary:
      "Local language models paired with explicit conversation-state control. LLaMA 3.1 and Mistral 7B run through Ollama, with an automated pipeline to evaluate dialogue behaviour.",
    tags: [
      "LLaMA 3.1",
      "Mistral 7B",
      "Ollama",
      "Finite-state machine",
      "Evaluation",
    ],
    visual: "dialogue",
    problem: [
      "A multilingual dialogue system needs to handle language while maintaining a clear conversation flow. Generating a fluent answer and controlling the next dialogue step are separate engineering concerns.",
      "The assistant supports English, Bengali and Hindi, with a finite-state machine controlling the flow around local LLM inference.",
    ],
    role: [
      "Built the multilingual LLM dialogue system with LLaMA 3.1 and Mistral 7B served through Ollama.",
      "Implemented finite-state conversation control and a 36-trial automated evaluation pipeline to inspect dialogue behaviour across the supported languages.",
    ],
    architecture: [
      { title: "User dialogue", detail: "English · Bengali · Hindi" },
      { title: "State controller", detail: "Finite-state conversation flow" },
      { title: "Local inference", detail: "Ollama · LLaMA 3.1 / Mistral 7B" },
      { title: "Evaluation", detail: "36 automated trials" },
    ],
    architectureNote:
      "Simplified conceptual architecture. The visual shows system structure rather than an actual conversation or measured trial result.",
    challenge: {
      title: "Separating conversation flow from model output.",
      confirmed: false,
      paragraphs: [
        "The finite-state machine controls conversation flow while the local models provide language generation. This is a confirmed design choice, not a claim about an unreported failure.",
        "TODO: Add a real failure transcript, the state transition or inference change that fixed it, and the corresponding evaluation result.",
      ],
    },
    results: [
      { value: "3", label: "supported languages" },
      { value: "36", label: "automated evaluation trials" },
    ],
    resultNote:
      "The trial count describes the evaluation pipeline. Pass rate, language-specific scores, latency and model comparisons have not been supplied.",
    links: [{ label: "GitHub profile", href: "https://github.com/SN1604129" }],
    linkNote:
      "TODO: Replace the profile link with the exact project repository and add reproducible setup instructions.",
    todos: [
      "TODO: Add the financial assistant repository, runnable setup, real screenshots or demo recording.",
      "TODO: Document the 36 trial definitions, measured outcomes and a verified failure/fix example.",
    ],
  },
  {
    slug: "healthcare-nlp",
    number: "04",
    group: "University",
    featured: true,
    featuredOrder: 2,
    title: "Healthcare NLP System",
    shortTitle: "Clinical language, made inspectable.",
    category: "University project · Applied NLP",
    outcome:
      "An 8-tab Streamlit application for clinical entity recognition, relation extraction and summarisation.",
    summary:
      "Fine-tuned BioBERT and ClinicalBERT brought into an application where the language-processing tasks can be explored through a usable interface.",
    tags: ["BioBERT", "ClinicalBERT", "Streamlit", "NLP", "Fine-tuning"],
    visual: "healthcare",
    problem: [
      "Clinical text contains entities, relationships and narrative information that need different processing tasks. This project brings named-entity recognition, relation extraction and clinical summarisation into one application.",
      "The work combines fine-tuned BioBERT and ClinicalBERT with an 8-tab Streamlit interface.",
    ],
    role: [
      "Built the healthcare NLP application, bringing the supplied model fine-tuning and language-processing tasks into an 8-tab Streamlit interface.",
      "The public repository is available for inspection. Exact evaluation scores, datasets and individual/team contribution boundaries should be checked against its documentation.",
    ],
    architecture: [
      { title: "Clinical text", detail: "Input to the NLP application" },
      { title: "Model layer", detail: "Fine-tuned BioBERT / ClinicalBERT" },
      {
        title: "Language tasks",
        detail: "NER · Relation extraction · Clinical summarisation",
      },
      { title: "Application", detail: "8-tab Streamlit interface" },
    ],
    architectureNote:
      "Conceptual view of the supplied components. It does not assign a specific model to an unconfirmed task or reproduce real patient records.",
    challenge: {
      title: "Showing the work beyond the model.",
      confirmed: false,
      paragraphs: [
        "The project combines model work with an application: entity recognition, relation extraction and summarisation are exposed through the Streamlit interface.",
        "The repository is the inspectable artefact. No clinical validation or accuracy claim is made without the evaluation protocol and results.",
      ],
    },
    results: [
      { value: "8", label: "application tabs" },
      { value: "NER", label: "entity recognition" },
      { value: "Code", label: "public repository available" },
    ],
    resultNote:
      "The demonstrated result is the application and its supplied capabilities. Benchmark scores and clinical-use validation have not been supplied.",
    links: [
      {
        label: "View repository",
        href: "https://github.com/SN1604129/NLP_Assignment3",
      },
    ],
    todos: [
      "TODO: Add Healthcare NLP dataset details, evaluation protocol, contribution boundaries and a real application screenshot or recording.",
    ],
  },
  {
    slug: "ros2-robot-vision",
    number: "05",
    group: "University",
    featured: true,
    featuredOrder: 3,
    title: "ROS2 Robot Vision & Navigation",
    shortTitle: "From a classifier to a physical control loop.",
    category: "University project · Embodied AI",
    outcome:
      "MobileNetV3-Large on a physical robot, connected to a four-state navigation loop.",
    summary:
      "Computer vision meets embodied behaviour: SEARCH → ALIGN → APPROACH → ARRIVED, with an explicit state-based control structure.",
    tags: ["ROS2", "MobileNetV3-Large", "Computer vision", "State machines"],
    visual: "robot",
    problem: [
      "A model running on a robot has to connect perception with behaviour. This project pairs a MobileNetV3-Large classifier with a physical ROS2 robot and an explicit navigation loop.",
      "The loop has four states: SEARCH, ALIGN, APPROACH and ARRIVED.",
    ],
    role: [
      "Worked on the MobileNetV3-Large classifier running on a physical robot and the four-state navigation loop in ROS2.",
    ],
    architecture: [
      {
        title: "Robot perception",
        detail: "Visual input on the physical robot",
      },
      { title: "Classification", detail: "MobileNetV3-Large" },
      { title: "State control", detail: "SEARCH → ALIGN → APPROACH → ARRIVED" },
      { title: "Robot behaviour", detail: "Navigation on physical hardware" },
    ],
    architectureNote:
      "Conceptual architecture from the supplied project description. Hardware model, ROS2 distribution, topics and precise control thresholds are not assumed.",
    challenge: {
      title: "Making the control structure explicit.",
      confirmed: false,
      paragraphs: [
        "The four named states make the intended progression from search to arrival visible in the architecture.",
        "A recording of the physical robot and documented recovery behaviour would make the strongest next evidence for this case study. Neither an unseen demonstration nor unreported success rate is claimed here.",
      ],
    },
    results: [
      { value: "Physical", label: "robot implementation" },
      { value: "4", label: "navigation states" },
      { value: "ROS2", label: "robotics framework" },
    ],
    resultNote:
      "The supplied evidence establishes the physical robot, classifier and state loop. Navigation success rate, inference latency and hardware details have not been supplied.",
    links: [{ label: "GitHub profile", href: "https://github.com/SN1604129" }],
    linkNote: "The exact project repository will be added when available.",
    todos: [
      "TODO: Add the ROS2 repository, hardware/distribution details, individual contribution and a real robot demonstration.",
    ],
  },
];

export const projects: Project[] = [
  ...coreProjects,
  ...(additions as Project[]),
].filter((project) => project.published !== false);
export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
export const industryProject = projects.find(
  (project) => project.slug === "truuth-document-forensics",
)!;

export const moreProjects = [
  {
    title: "NeMA-LC / NeMA-Lite",
    category: "Transformer research",
    description:
      "Memory-augmented transformers exploring long-context reasoning.",
    tags: ["Transformers", "Neural memory"],
    href: "https://github.com/SN1604129",
    linkLabel: "GitHub profile", // TODO: Add exact NeMA repository links and verified research status.
    status: null,
  },
  {
    title: "StressTwinNet",
    category: "Multimodal learning",
    description:
      "Digital-twin-inspired modelling of physiological stress using multiple modalities.",
    tags: ["Physiological AI", "Digital twins"],
    href: "https://github.com/SN1604129",
    linkLabel: "GitHub profile", // TODO: Add the StressTwinNet repository when shareable.
    status: "In progress",
  },
  {
    title: "Infectious-Disease Recognition",
    category: "Undergraduate thesis",
    description:
      "Transfer learning for infectious-disease recognition. Approximately 92% accuracy reported in the undergraduate thesis; dataset and split context still to be documented.",
    tags: ["Transfer learning", "Image classification"],
    href: "https://github.com/SN1604129",
    linkLabel: "GitHub profile", // TODO: Add the thesis repository and dataset/split details for the reported accuracy.
    status: null,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
