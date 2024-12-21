/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck

import { ImageResponse } from "next/og";

export const runtime = "edge";
export async function GET(request: Request) {
  const connorHeadshot = await fetch(
    new URL(
      "../../../public/connorforsythheadshot-Medium.jpeg",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const fontDataKag = await fetch(
    new URL(
      "../../../public/fonts/KAG/KynetonArtGrotesque-Regular.woff",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "Connor Forsyth";

    const hasType = searchParams.has("type");
    const type = hasTitle ? searchParams.get("type") : "type";

    const hasUrl = searchParams.has("url");
    const url = hasTitle ? searchParams.get("url") : "url";

    return new ImageResponse(
      (
        <div
          style={{
            height: "630px",
            width: "1200px",
            display: "flex",
          }}
        >
          <div tw="flex w-full h-full px-4 bg-zinc-100 flex-col">
            <div tw="flex justify-between flex-grow">
              <h1 tw="text-4xl">{title}</h1>
              <h1 tw="text-4xl">👋 c@connorforsyth.co</h1>
            </div>
            <div tw="flex justify-end">
              <h2 tw="text-5xl flex items-start -m-0.5 flex-col flex-grow pr-3">
                <span>Design Technologist</span>
              </h2>
              <img
                width="500"
                height="600"
                tw="rounded-xl border-2 shadow-lg border-white"
                src={connorHeadshot}
                alt="Connor's headshot"
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "kag",
            data: fontDataKag,
            style: "normal",
          },
        ],
        emoji: "noto",
      },
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
