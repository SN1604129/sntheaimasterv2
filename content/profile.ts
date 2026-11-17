export const profile = {
  brand: "SN The AI Master",
  name: "Sudipta Nath",
  role: "AI Engineer",
  location: "Sydney, Australia",
  availability: "Open to AI Engineer roles",
  email: "sudipta1604129@gmail.com",
  github: "https://github.com/SN1604129",
  url: "https://sntheaimaster.com",
  resume: "/Sudipta-Nath-Resume.pdf",
  headline:
    "AI Engineer building LLM, RAG and agentic systems that work on messy real-world data.",
  proof:
    "Built a document-forensics LLM pipeline at Truuth: 40/40 tampered documents detected, zero false positives.",
  proofNote:
    "Final evaluation result; a bounded test set, not a guarantee on unseen documents.",
  introduction:
    "I build across the full problem: data, models, application logic and evaluation. My work spans multimodal document forensics, multilingual dialogue systems and software used by a real Sydney business.",
  philosophy:
    "The interesting work starts when a model fails. I care about understanding why, changing the system, and testing whether the fix holds.",
  linkedin: null, // TODO: Add your confirmed LinkedIn URL; no old URL is assumed.
};

export const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/#research" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

export const skills = [
  {
    label: "AI & language",
    items: [
      "LLMs",
      "RAG",
      "Prompt engineering",
      "Multimodal inference",
      "Evaluation pipelines",
      "Transformers",
    ],
  },
  {
    label: "Engineering",
    items: [
      "Python",
      "SQL",
      "JavaScript",
      "REST APIs",
      "Docker",
      "Git / GitHub",
      "Streamlit",
    ],
  },
  {
    label: "Models & systems",
    items: [
      "AWS Bedrock",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "OpenCV",
      "ROS2",
    ],
  },
];

export const timeline = [
  {
    date: "Completed June 2026",
    title: "AI Engineer Intern",
    organisation: "Truuth · Identity verification startup",
    description:
      "Built and evaluated a document-forensics pipeline using multimodal inference, forensic signals and RAG. Tracked regression behaviour across 12 versions and wrote R&D handover documentation.",
  },
  {
    date: "Completed July 2026",
    title: "Master of Information Technology",
    organisation: "Macquarie University · Artificial Intelligence",
    description:
      "Research and applied work across language models, computer vision and AI systems.",
  },
  {
    date: "2017–2022",
    title: "BSc Computer Science & Engineering",
    organisation: "CUET · Bangladesh",
    description:
      "Undergraduate thesis on infectious-disease recognition with transfer learning.",
  },
];

export const footerContent = {
  invitation: "Have an AI project?",
  note: "Built with care in Sydney.",
};
