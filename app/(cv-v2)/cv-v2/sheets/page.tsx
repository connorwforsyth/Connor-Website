import { CvSheets } from "@/components/cv-v2/cv-sheets";

/**
 * Plain, animation-free render of the CV sheets. Exists so
 * scripts/generate-cv-v2-textures.ts can screenshot each `.page` at 2x
 * into the textures the /cv-v2 WebGL paper meshes are wrapped in.
 */
export default function CvV2SheetsPage() {
  return (
    <div className="flex flex-col gap-8">
      <CvSheets />
    </div>
  );
}
