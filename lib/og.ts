import siteMetadata from "@/config/site-metadata";

interface OgImageParams {
  description?: string;
  title: string;
  type?: string;
}

export function getOgImageUrl({
  title,
  description,
  type,
}: OgImageParams): string {
  const url = new URL("/api/og", siteMetadata.siteUrl);
  url.searchParams.set("title", title);
  if (description) {
    url.searchParams.set("description", description);
  }
  if (type) {
    url.searchParams.set("type", type);
  }
  return url.toString();
}
