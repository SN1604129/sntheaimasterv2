import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { logoSource } from "@/components/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function AppleIcon() {
  const original = await readFile(path.join(process.cwd(), "public", logoSource));
  const scale = size.width / 168;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 40 * scale }}>
      <img
        src={`data:image/png;base64,${original.toString("base64")}`}
        alt=""
        width={720 * scale}
        height={480 * scale}
        style={{ position: "absolute", left: -116 * scale, top: -156 * scale }}
      />
    </div>,
    size,
  );
}
