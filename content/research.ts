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
    title: "Development of an Automatic Class Attendance System using CNN-based Face Recognition",
    description: "Computer vision for automated class attendance.",
    href: "https://ieeexplore.ieee.org/abstract/document/9350904",
  },
  {
    year: "2023",
    publisher: "Taylor & Francis",
    title: "Analysis of Physical and Psychological Impacts to Predict Satisfaction of Students toward E-Learning during COVID-19 Pandemic",
    description: "Book chapter in Applied Informatics for Industry 4.0, examining student satisfaction in e-learning.",
    href: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003256069-14/analysis-physical-psychological-impacts-predict-satisfaction-students-toward-learning-covid-19-pandemic-sudipta-nath",
  },
];
