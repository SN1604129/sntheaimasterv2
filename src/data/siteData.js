export const siteConfig = {
  name:     'Sudipta Nath',
  initials: 'SN',
  brand:    'SNTheAIMaster',
  title:    'AI Engineer & Builder',
  tagline:  'I build AI systems that actually work in production — not just in papers.',
  location: 'Sydney, Australia',
  email:    'sudipta@sntheaimaster.com',
  linkedin: 'https://linkedin.com/in/sudipta-nath-bb185a210',
  github:   'https://github.com/SN1604129',
}

export const credibilityItems = [
  { value: '2',                    label: 'Peer-Reviewed Publications' },
  { value: 'IEEE',                 label: '& Taylor & Francis' },
  { value: 'AI Research Intern',   label: 'at Truuth, Sydney' },
  { value: 'Macquarie University', label: 'Master of IT (AI)' },
  { value: 'Sydney',               label: 'Australia' },
]

export const buildDomains = [
  {
    id:        'enterprise',
    icon:      '◈',
    title:     'Enterprise AI Automation',
    description:
      'I build private AI pipelines for businesses — document intelligence, workflow automation, and LLM systems deployed inside your own infrastructure. Your data never leaves.',
    accent:    'indigo',
    link:      '/demo',
    linkLabel: 'See live demos →',
  },
  {
    id:        'research',
    icon:      '◉',
    title:     'AI Research',
    description:
      'Published work in multimodal AI, NLP, and transformer-based architectures. Peer-reviewed output in IEEE and Taylor & Francis. Active research in neural memory systems and physiological AI.',
    accent:    'teal',
    link:      '/research',
    linkLabel: 'Read the papers →',
  },
  {
    id:        'tools',
    icon:      '◎',
    title:     'Production AI Systems',
    description:
      'Built and deployed real AI pipelines at a Sydney startup — document authenticity verification, synthetic media detection, and multimodal LLM analysis using AWS Bedrock.',
    accent:    'amber',
    link:      '/contact',
    linkLabel: 'Work with me →',
  },
]

export const publications = [
  {
    id:        'pub-01',
    title:     'Development of an Automatic Class Attendance System using CNN-Based Face Recognition',
    authors:   'Sudipta Nath, Soumitra Chowdhury, Ashim Dey, Annesha Das',
    venue:     'IEEE International Conference on Electrical, Computer and Communication Engineering (ETCCE)',
    year:      '2020',
    publisher: 'IEEE',
    doi:       'https://ieeexplore.ieee.org',
    abstract:
      'A CNN-based automated attendance system using face recognition, designed for real-world classroom deployment. The system achieves robust performance under varied lighting conditions and partial occlusion, eliminating manual attendance processes through computer vision.',
    tags:      ['Computer Vision', 'CNN', 'Face Recognition', 'Deep Learning'],
    pdf:       null,
  },
  {
    id:        'pub-02',
    title:     'Analysis of Physical and Psychological Impacts to Predict Satisfaction of Students toward E-Learning during COVID-19',
    authors:   'Sudipta Nath et al.',
    venue:     'Applied Informatics for Industry 4.0, Taylor & Francis',
    year:      '2023',
    publisher: 'Taylor & Francis',
    doi:       'https://www.taylorfrancis.com',
    abstract:
      'A multimodal analysis framework examining physical and psychological factors affecting student satisfaction in e-learning environments during COVID-19. Applies machine learning to identify key predictors of learning outcomes under remote education conditions.',
    tags:      ['NLP', 'Multimodal AI', 'E-Learning', 'COVID-19', 'Machine Learning'],
    pdf:       null,
  },
]

export const researchProjects = [
  {
    id:      'stresstwinnet',
    name:    'StressTwinNet',
    status:  'Active',
    description:
      'A multimodal deep learning framework for modelling human stress responses from physiological sensor streams — EEG, ECG, and GSR — using cross-modal representation learning and digital-twin-inspired temporal architectures.',
    methodology: 'Cross-modal representation learning · Digital twin temporal architectures · Ablation studies on modality fusion · Robustness under real-world sensor noise',
    goal:    'Benchmark prediction accuracy across subjects; evaluate interpretability and generalisation of physiological state models.',
    github:  'https://github.com/SN1604129',
  },
  {
    id:      'nema-lc',
    name:    'NeMA-LC — Neural Memory Allocation with Lifecycle Control',
    status:  'Active',
    description:
      'A Transformer memory management framework with explicit lifecycle control — learned gating over write, retain, update, and forget operations. Demonstrates improved auditability and controllability over standard attention-based memory.',
    methodology: 'Transformer memory gating · Lifecycle control mechanisms · Memory retention benchmarking · Computational overhead analysis',
    goal:    'Demonstrate improved controllability and auditability over standard attention mechanisms on downstream sequence tasks.',
    github:  'https://github.com/SN1604129',
  },
  {
    id:      'nema-lite',
    name:    'NeMA-Lite — Sparse Selective Memory Writing in Transformers',
    status:  'Completed',
    description:
      'A lightweight memory-augmented Transformer with sparse write gates. Systematic analysis of the memory capacity vs. computational efficiency trade-off — selective memory writing improves parameter efficiency without sacrificing task accuracy.',
    methodology: 'Sparse write gates · Memory capacity analysis · Sequence modelling benchmarks · Parameter efficiency optimisation',
    goal:    'Published and benchmarked. Demonstrates selective memory writing as a practical efficiency strategy.',
    github:  'https://github.com/SN1604129',
  },
  {
    id:      'mytalegenie',
    name:    'MyTaleGenie',
    status:  'Prototype',
    description:
      'An AI-powered personalised comic book generator. Users upload a photo, choose a character genre and superpowers — the system generates a personalised comic featuring their face as the superhero. Provisional patent in progress.',
    methodology: 'Face-preserving image generation · IP-Adapter · Multimodal story generation · Comic panel consistency',
    goal:    'Consumer product launch. Patent filing via IP Australia.',
    github:  null,
  },
]

export const researchInterests = [
  'Neural memory architectures for Transformer models',
  'Multimodal AI for physiological signal analysis',
  'Document intelligence and fraud detection',
  'NLP for legal and enterprise document processing',
  'Adversarial robustness in real-world AI systems',
  'Lightweight architectures for edge deployment',
]

export const currentFocus = [
  {
    tag:   'Production',
    name:  'AI Research Intern at Truuth',
    desc:  'Building and evaluating deep learning pipelines for document authenticity verification and synthetic media detection. AWS Bedrock, Qwen3-VL, Claude — real production systems.',
  },
  {
    tag:   'Research',
    name:  'Master of IT (AI) — Macquarie University',
    desc:  'Active research in neural memory architectures and multimodal learning. NeMA-LC and StressTwinNet in development. Two peer-reviewed publications already.',
  },
  {
    tag:   'Available',
    name:  'AI Consulting & System Design',
    desc:  'Open to consulting on AI automation, LLM pipelines, and document intelligence systems for Sydney businesses. Private infrastructure deployments welcome.',
  },
]

export const experience = [
  {
    role:    'AI Research Intern — Fraud Detection & Document Intelligence',
    company: 'Truuth',
    location: 'Sydney, Australia',
    period:  '2026 – Present',
    bullets: [
      'Build and evaluate deep learning and computer vision models for document authenticity verification and synthetic media detection across real-world multimodal datasets',
      'Run controlled experiments and ablation studies benchmarking detection algorithms across model architectures',
      'Investigate adversarial robustness and model failure modes through forensic analysis of manipulated documents',
      'Engineer evaluation pipelines and benchmarking frameworks for security-critical deployment conditions',
    ],
  },
]

export const education = [
  {
    degree:  'Master of Information Technology (Artificial Intelligence)',
    school:  'Macquarie University',
    location: 'Sydney, Australia',
    period:  '2024 – Present',
    detail:  'Machine learning, deep learning, NLP, AI system design. Active research in multimodal learning and neural memory architectures.',
  },
  {
    degree:  'Bachelor of Engineering in Computer Science and Engineering',
    school:  'CUET',
    location: 'Bangladesh',
    period:  '2017 – 2022',
    detail:  'Algorithms, data structures, computer vision, software development. Final-year research yielded IEEE-published CNN face recognition system.',
  },
]

export const leadership = [
  { role: 'Vice President', org: 'Macquarie University Bangladesh Students Association', period: '2025 – Present' },
  { role: 'President', org: 'CUET Computer Club', period: '2020 – 2022' },
]

export const skills = {
  languages:  ['Python', 'C++', 'JavaScript', 'SQL'],
  ai:         ['Deep Learning', 'Computer Vision', 'NLP', 'LLMs', 'Multimodal Learning', 'Transformer Architectures', 'Fine-tuning', 'Adversarial Robustness', 'RAG Pipelines'],
  frameworks: ['PyTorch', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'LangChain', 'LangGraph', 'FastAPI'],
  tools:      ['AWS Bedrock', 'Docker', 'Git', 'Linux', 'GPU Training', 'FAISS'],
  certifications: [
    'Generative AI with LLMs — DeepLearning.AI',
    'Neural Networks & Deep Learning — DeepLearning.AI',
    'Long-Term Agentic Memory with LangGraph',
    'PyTorch Fundamentals',
    'Data Scientist with Python — DataCamp',
  ],
}
