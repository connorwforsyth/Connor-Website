import { NextResponse } from "next/server";
import Redis from "ioredis";

// Redis configuration constants
const REDIS_CONFIG = {
  MAX_RETRIES: 3,
  CONNECT_TIMEOUT_MS: 5000,
  BASE_RETRY_DELAY_MS: 50,
  MAX_RETRY_DELAY_MS: 1000,
} as const;

if (!process.env.STORAGE_REDIS_URL) {
  console.error("Missing STORAGE_REDIS_URL environment variable");
  throw new Error("STORAGE_REDIS_URL not configured");
}

console.log(
  "Connecting to Redis:",
  process.env.STORAGE_REDIS_URL.split("@")[1],
); // Log URL safely

const redis = new Redis(process.env.STORAGE_REDIS_URL, {
  maxRetriesPerRequest: REDIS_CONFIG.MAX_RETRIES,
  connectTimeout: REDIS_CONFIG.CONNECT_TIMEOUT_MS,
  tls: {
    rejectUnauthorized: false,
  },
  enableReadyCheck: false,
  enableOfflineQueue: false,
  retryStrategy: (times) => {
    if (times > REDIS_CONFIG.MAX_RETRIES) {
      console.log("Max retries reached, giving up");
      return null;
    }
    const delay = Math.min(
      times * REDIS_CONFIG.BASE_RETRY_DELAY_MS,
      REDIS_CONFIG.MAX_RETRY_DELAY_MS,
    );
    console.log(`Retry attempt ${times} with delay ${delay}ms`);
    return delay;
  },
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

type FigmaData = {
  lastModified: string;
};

type KVData = {
  timestamp: string;
  lastModified: string;
  fileKey: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("fileKey");

  console.log("API called with fileKey:", fileKey);

  if (!fileKey) {
    return NextResponse.json(
      { error: "File key is required" },
      { status: 400 },
    );
  }

  try {
    // First get Redis data
    console.log("Fetching from Redis...");
    const redisData = await redis.get("figma-last-modified");
    const kvData = redisData ? (JSON.parse(redisData) as KVData) : null;
    console.log("Redis Data:", kvData);

    console.log("Fetching from Figma...");
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-Figma-Token": process.env.FIGMA_ACCESS_TOKEN!,
      },
    });

    if (!response.ok) {
      console.error("Figma API error:", response.status, await response.text());
      if (kvData) return NextResponse.json(kvData);
      throw new Error(`Figma API error: ${response.status}`);
    }

    const figmaData = (await response.json()) as FigmaData;
    console.log("Figma Data:", figmaData);

    // Only update Redis if the lastModified time is different
    if (!kvData || kvData.lastModified !== figmaData.lastModified) {
      console.log("Updating Redis - new data detected");
      const newData = {
        timestamp: new Date().toISOString(),
        lastModified: figmaData.lastModified,
        fileKey,
      };
      await redis.set("figma-last-modified", JSON.stringify(newData));
      return NextResponse.json(newData);
    }

    // Return existing Redis data if no updates
    return NextResponse.json(kvData);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
