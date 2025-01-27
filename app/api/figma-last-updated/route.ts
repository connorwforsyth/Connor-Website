import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("fileKey");

  if (!fileKey) {
    return NextResponse.json(
      { error: "File key is required" },
      { status: 400 },
    );
  }

  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Figma access token not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-Figma-Token": token,
      },
    });

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Unauthorized access to Figma API" },
        { status: 401 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Figma API" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ lastModified: data.lastModified });
  } catch (error) {
    console.error("Error fetching Figma data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
