import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt =
  "Sudipta Nath — AI Engineer in Sydney. LLMs, RAG and multimodal systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#101313",
          color: "#f0f3ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 30 }}>SN THE AI MASTER</div>
          <div style={{ display: "flex", color: "#9eb5ac", fontSize: 20 }}>
            SYDNEY, AUSTRALIA
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              letterSpacing: "-4px",
              lineHeight: 1.05,
            }}
          >
            AI engineering.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              letterSpacing: "-4px",
              lineHeight: 1.05,
              color: "#b2efd6",
            }}
          >
            With evidence.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              marginTop: 14,
              color: "#a7b3ae",
            }}
          >
            LLMs · RAG · Multimodal systems · Evaluation
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #36413b",
            paddingTop: 28,
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex" }}>sntheaimaster.com</span>
          <span style={{ display: "flex", color: "#b2efd6" }}>
            Open to AI Engineer roles ↗
          </span>
        </div>
      </div>
    ),
    size,
  );
}
