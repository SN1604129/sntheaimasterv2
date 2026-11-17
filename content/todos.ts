import { projects } from "./projects";

export const ownerTodos = [
  "TODO: Create a Web3Forms access key registered to sudipta1604129@gmail.com, set NEXT_PUBLIC_WEB3FORMS_KEY and rebuild. Test actual inbox delivery.",
  "TODO: Review the fact-based generated resume PDF and replace it with your preferred final resume if needed.",
  "TODO: Add the confirmed LinkedIn URL in content/profile.ts.",
  ...projects.flatMap((project) => project.todos),
  "TODO: Add exact repository links for ROS2, NeMA-LC / NeMA-Lite, StressTwinNet and the infectious-disease thesis. Current links explicitly point to your GitHub profile.",
  "TODO: Add the thesis dataset and evaluation split for the approximately 92% accuracy result.",
  "TODO: Confirm TRACE status and add a permitted repository, paper or research link.",
  "TODO: Add exact titles, author lists and DOI URLs for both publications in content/research.ts.",
  "TODO: Review and finish the MDX draft with permitted synthetic examples and employer approval.",
  "TODO: Enable Vercel Web Analytics in the deployed project; check custom-event plan availability for enquiry conversions.",
  "TODO: Connect sntheaimaster.com and www.sntheaimaster.com in Vercel and apply the exact DNS records Vercel provides.",
];
