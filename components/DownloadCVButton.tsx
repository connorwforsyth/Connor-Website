import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";

const CV_PDF_PATH = "/connor-forsyth-cv.pdf";

export function DownloadCVButton() {
  return (
    <a
      aria-label="Download CV as PDF"
      className="download-cv-button"
      download="Connor-Forsyth-CV.pdf"
      href={CV_PDF_PATH}
    >
      <DownloadSimpleIcon aria-hidden="true" size={20} weight="bold" />
    </a>
  );
}
