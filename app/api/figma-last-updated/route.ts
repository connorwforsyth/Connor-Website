import { NextResponse } from "next/server";

type FigmaData = {
  lastModified: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("fileKey");

  if (!fileKey) {
    return NextResponse.json(
      { error: "File key is required" },
      { status: 400 }
    );
  }

  if (!process.env.FIGMA_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Figma access token not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-Figma-Token": process.env.FIGMA_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Figma API error: ${response.status} - ${errorText}`);
    }

    const figmaData = (await response.json()) as FigmaData;

    return NextResponse.json({
      fileKey,
      lastModified: figmaData.lastModified,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Figma API error:", error);
    return NextResponse.json(
      { details: String(error), error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
