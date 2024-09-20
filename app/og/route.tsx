import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Chirag Dalmia";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f4f5",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
            backgroundClip: "text",
            color: "transparent",
            padding: "10px 20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "80%",
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            marginTop: 24,
            color: "#52525b",
          }}
        >
          Front-end Developer
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      
    }
  );
}