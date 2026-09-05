"use client";

import { ArrowLeftIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CvActions() {
  return (
    <div className="cv-actions">
      <Link
        aria-label="Home — back to connorforsyth.co"
        className={buttonVariants({
          className: "cv-home-link gap-1.5",
          size: "default",
          variant: "ghost",
        })}
        href="/"
      >
        <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
        Home
      </Link>
      <a
        aria-label="Download CV as PDF"
        className={buttonVariants({
          className: "cv-pdf-download",
          size: "icon",
          variant: "ghost",
        })}
        download="Connor-Forsyth-CV.pdf"
        href="/connor-forsyth-cv.pdf"
        title="Download CV as PDF"
      >
        <DownloadSimpleIcon aria-hidden="true" data-icon="inline-start" />
      </a>
    </div>
  );
}
