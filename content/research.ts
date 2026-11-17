export const research = {
  title: "TRACE",
  expansion: "Temporal Reasoning for ADS Causal Extraction",
  description:
    "Neurosymbolic causal reasoning for autonomous-driving crash scenarios, with LTL / SAT solver verification.",
  supervision: "Supervised by Dr. Xi Zheng · Macquarie University",
  note: "Research project; no publication or evaluation result is claimed.",
  // TODO: Confirm TRACE status and add a permitted repository, paper or research link.
};

type Publication = {
  year: string;
  publisher: string;
  title: string;
  description: string;
  href: string | null;
};

export const publications: Publication[] = [
  {
    year: "2020",
    publisher: "IEEE · ETCCE",
    title: "CNN face-recognition attendance system",
    description: "Computer vision for automated class attendance.",
    href: null,
    // TODO: Add the exact IEEE publication title, author list and DOI URL.
  },
  {
    year: "2023",
    publisher: "Taylor & Francis",
    title: "Predicting student satisfaction with e-learning",
    description: "Research on student satisfaction in e-learning.",
    href: null,
    // TODO: Add the exact Taylor & Francis publication title, author list and DOI URL.
  },
];
