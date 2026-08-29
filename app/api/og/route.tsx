/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import { ImageResponse } from "next/og";

const SITE_AUTHOR = "Connor Forsyth";
const SITE_ROLE = "Design Engineer";
const SITE_EMAIL = "👋 c@connorforsyth.co";

const MAX_TITLE_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 120;

function truncate(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function parseParams(requestUrl: string) {
  const { searchParams } = new URL(requestUrl);

  const rawTitle = searchParams.get("title");
  const rawDescription = searchParams.get("description");

  return {
    description: rawDescription
      ? truncate(rawDescription, MAX_DESCRIPTION_LENGTH)
      : null,
    title: rawTitle ? truncate(rawTitle, MAX_TITLE_LENGTH) : null,
    type: searchParams.get("type") ?? "",
  };
}

export async function GET(request: Request) {
  const [connorHeadshot, fontDataKag] = await Promise.all([
    fetch(
      new URL(
        "../../../public/connorforsythheadshot-Medium.jpeg",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "../../../public/fonts/KAG/KynetonArtGrotesque-Regular.woff",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer()),
  ]);

  try {
    const { title, description, type } = parseParams(request.url);

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          fontFamily: "kag",
          height: "630px",
          width: "1200px",
        }}
        tw="text-3xl"
      >
        {/*
            satori (the renderer behind next/og) parses its own internal
            Tailwind-class table and can't read this app's CSS custom
            properties, so var(--background) etc. won't resolve here. These
            literal hex values are the resolved light-mode values of
            --background / --foreground / --muted-foreground in
            styles/globals.css — keep them in sync if the palette changes.
          */}
        <div tw="flex w-full h-full bg-[#f5f5f5] text-[#09090b] flex-col p-8">
          <div tw="flex justify-between items-start flex-grow">
            <div style={{ maxWidth: 680 }} tw="flex flex-col">
              <div tw="mb-2">{SITE_AUTHOR}</div>
              {(type || title) && (
                <div tw="flex mb-2">
                  {type && <div tw="text-[#71717a] mr-2">{`${type} /`}</div>}
                  {title && <div>{title}</div>}
                </div>
              )}
              {!type && <div>{SITE_ROLE}</div>}
              {description && <div tw="mt-4 leading-snug">{description}</div>}
            </div>
            <div tw="flex">
              <div>{SITE_EMAIL}</div>
            </div>
          </div>
          <div tw="flex justify-end items-end">
            <img
              alt=""
              height={500}
              src={connorHeadshot}
              style={{ objectFit: "cover" }}
              tw="rounded-xl border shadow-xl"
              width={350}
            />
          </div>
        </div>
      </div>,
      {
        emoji: "noto",
        fonts: [
          {
            data: fontDataKag,
            name: "kag",
            style: "normal",
          },
        ],
        height: 630,
        width: 1200,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
