export type Project = {
  name: string;
  url: string;
  githubUrl?: string;
  description: string;
};

export const personalProjects: Project[] = [
  {
    name: "FleetView",
    url: "https://fleetview.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/fleetview",
    description:
      "Fleet management dashboard for tracking vehicles, drivers, and logistics in real time.",
  },
  {
    name: "CodeMentor AI",
    url: "https://codementor-ai.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/codementor-ai",
    description:
      "AI mentor that reviews your code and guides you toward better solutions.",
  },
  {
    name: "Portfolio v1.0",
    url: "https://v1.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/portfolio1.0",
    description: "My original portfolio design, kept alive as an archive.",
  },
  {
    name: "Photosynth-AI",
    url: "https://photosynthai.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/imageGenerator",
    description: "AI-powered SaaS for quick image transformations.",
  },
  {
    name: "Custom Auth",
    url: "https://github.com/ChiragDalmia/fullstack-customAuth",
    githubUrl: "https://github.com/ChiragDalmia/fullstack-customAuth",
    description: "Custom-built full-stack authentication system from scratch.",
  },
];

export const hackathonProjects: Project[] = [
  {
    name: "AnatomyAR",
    url: "https://anatomyar.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/anatomyAR",
    description: "Teaching human anatomy through immersive AR.",
  },
  {
    name: "ScanTerra",
    url: "https://scanterra.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/scanterra",
    description:
      "Scan a barcode to evaluate a product's carbon footprint using AI.",
  },
  {
    name: "ARchatPet",
    url: "https://archatpet.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/archatpet",
    description:
      "Turn a photo of your pet into a 3D model and chat with it in AR.",
  },
  {
    name: "DataFlow Dashboard",
    url: "https://dataflow-dashboard.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/dataflow-dashboard",
    description: "Dashboard for visualizing and monitoring data pipeline flows.",
  },
  {
    name: "DocIntelligence",
    url: "https://docintelligence.chiragdalmia.com/",
    githubUrl: "https://github.com/ChiragDalmia/docintelligence",
    description:
      "AI-powered document analysis and intelligence extraction tool.",
  },
  {
    name: "PetRescue",
    url: "https://github.com/ChiragDalmia/petRescue",
    githubUrl: "https://github.com/ChiragDalmia/petRescue",
    description: "Platform connecting rescued pets with potential adopters.",
  },
  {
    name: "Quicture",
    url: "https://github.com/JasonLovesDoggo/quicture",
    githubUrl: "https://github.com/JasonLovesDoggo/quicture",
    description:
      "Peer-to-peer image sharing platform on the go, that preserves quality",
  },
];

export const projectsData: Project[] = [
  ...personalProjects,
  ...hackathonProjects,
];
