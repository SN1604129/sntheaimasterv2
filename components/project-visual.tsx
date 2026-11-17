import { Icon } from "./icon";
import type { Project } from "@/content/projects";

export function ProjectVisual({
  variant,
  hero = false,
}: {
  variant: Project["visual"];
  hero?: boolean;
}) {
  if (variant === "healthcare")
    return (
      <div
        className="project-visual healthcare-visual"
        role="img"
        aria-label="Conceptual Healthcare NLP application: an eight-tab Streamlit interface with named-entity recognition, relation extraction and clinical summarisation, using fine-tuned BioBERT and ClinicalBERT."
      >
        <div className="visual-topline">
          <span>HEALTHCARE NLP</span>
          <span>8-TAB APPLICATION</span>
        </div>
        <div className="clinical-text">
          <span className="eyebrow">Clinical language</span>
          <div className="clinical-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="clinical-models">BioBERT / ClinicalBERT</span>
        </div>
        <div className="nlp-capabilities">
          <div>
            <span>01</span>Entity recognition
            <Icon name="check" />
          </div>
          <div>
            <span>02</span>Relation extraction
            <Icon name="check" />
          </div>
          <div>
            <span>03</span>Clinical summarisation
            <Icon name="check" />
          </div>
        </div>
        <span className="visual-caption">
          Conceptual system map · No patient data
        </span>
      </div>
    );
  if (variant === "robot")
    return (
      <div
        className="project-visual robot-visual"
        role="img"
        aria-label="ROS2 robot architecture illustration: MobileNetV3-Large classifier and four navigation states, search, align, approach and arrived. This is a conceptual state diagram, not a photograph or live demonstration."
      >
        <div className="visual-topline">
          <span>ROS2 / PHYSICAL ROBOT</span>
          <Icon name="workflow" />
        </div>
        <div className="robot-identity">
          <svg
            viewBox="0 0 100 54"
            width="100"
            height="54"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 19h60v24H20zM38 19V9h24v10"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <circle cx="28" cy="45" r="6" stroke="currentColor" />
            <circle cx="72" cy="45" r="6" stroke="currentColor" />
            <circle cx="50" cy="14" r="2" fill="currentColor" />
            <path
              d="m41 5-5-5m23 5 5-5M34 28h32M34 34h20"
              stroke="currentColor"
            />
          </svg>
          <span>
            MobileNetV3-Large<small>Perception → state control</small>
          </span>
        </div>
        <div className="robot-states">
          {["SEARCH", "ALIGN", "APPROACH", "ARRIVED"].map((state, index) => (
            <div key={state}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {state}
              <Icon name={index === 3 ? "check" : "arrow"} />
            </div>
          ))}
        </div>
        <span className="visual-caption">
          Conceptual control loop · Physical hardware
        </span>
      </div>
    );
  if (variant === "stix")
    return (
      <div
        className="project-visual stix-visual"
        role="img"
        aria-label="Illustrative product map of the Stix Eatery platform: online ordering, rewards and loyalty, and administration. Not a live-site screenshot."
      >
        <div className="visual-topline">
          <span>STIX EATERY</span>
          <span>MIRANDA, NSW</span>
        </div>
        <div className="stix-wordmark">
          stix<span>eatery</span>
        </div>
        <div className="stix-product-areas">
          <div>
            <Icon name="window" />
            <span>Online ordering</span>
          </div>
          <div>
            <Icon name="layers" />
            <span>Rewards & loyalty</span>
          </div>
          <div>
            <Icon name="workflow" />
            <span>Admin platform</span>
          </div>
        </div>
        <span className="visual-caption">Illustrative product map</span>
      </div>
    );

  if (variant === "dialogue")
    return (
      <div
        className="project-visual dialogue-visual"
        role="img"
        aria-label="Conceptual multilingual assistant architecture: English, Bengali and Hindi inputs pass through a finite-state controller to local LLaMA and Mistral models via Ollama, with 36 evaluation trials."
      >
        <div className="visual-topline">
          <span>DIALOGUE ARCHITECTURE</span>
          <Icon name="workflow" />
        </div>
        <div className="language-row">
          <span>EN</span>
          <span>BN</span>
          <span>HI</span>
        </div>
        <div className="diagram-connector" />
        <div className="state-node">
          <span className="node-indicator" />
          Finite-state controller
          <Icon name="arrow" />
        </div>
        <div className="diagram-connector" />
        <div className="model-row">
          <span>LLaMA 3.1</span>
          <span>Mistral 7B</span>
          <small>via Ollama</small>
        </div>
        <span className="visual-caption">
          Conceptual diagram · 36 evaluation trials
        </span>
      </div>
    );

  return (
    <div
      className={`project-visual forensics-visual ${hero ? "hero-visual" : ""}`}
      role="img"
      aria-label="Synthetic illustration of a document-forensics pipeline: document input, ELA and PDF signals, multimodal reasoning, and decision logic. No employer documents are shown."
    >
      <div className="visual-topline">
        <span>DOCUMENT FORENSICS</span>
        <span className="visual-status">
          <span />
          SYSTEM OVERVIEW
        </span>
      </div>
      <div className="forensics-document">
        <div className="document-page">
          <div className="document-stamp">
            SYNTHETIC
            <br />
            DOCUMENT
          </div>
          <i />
          <i />
          <i />
          <div className="document-region">
            <i />
            <i />
            <span className="region-corner corner-one" />
            <span className="region-corner corner-two" />
          </div>
          <i />
          <i />
          <div className="document-bottom">
            <span />
            <span />
          </div>
        </div>
        <div className="signal-callout">
          <span className="eyebrow">Inspect the signal</span>
          <span>
            Small edit.
            <br />
            System-level fix.
          </span>
          <span className="signal-line" />
        </div>
      </div>
      <div className="pipeline-row">
        <span>Input</span>
        <Icon name="arrow" />
        <span>Signals</span>
        <Icon name="arrow" />
        <span>Reasoning</span>
        <Icon name="arrow" />
        <span>Decision</span>
      </div>
      <div className="visual-bottomline">
        <span>ELA + PDF + VLM + RAG</span>
        <span>Illustrative, synthetic data</span>
      </div>
    </div>
  );
}
