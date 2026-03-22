import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background:
            "radial-gradient(circle at top left, rgba(232,197,71,0.18), transparent 35%), linear-gradient(135deg, #0a0a0a 0%, #141414 55%, #0f0f0f 100%)",
          color: "#f5f5f5",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 30,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#e8c547",
            }}
          >
            BQ
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div
              style={{
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 1,
                maxWidth: "860px",
              }}
            >
              Съемка, продакшн и студийные проекты в Казахстане
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                maxWidth: "860px",
                color: "rgba(245,245,245,0.72)",
              }}
            >
              Кейсы, reels, YouTube и быстрый путь к заявке в одной системе BQ.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: 24,
              color: "rgba(245,245,245,0.68)",
            }}
          >
            <div>Алматы</div>
            <div>Астана</div>
            <div>WhatsApp</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
