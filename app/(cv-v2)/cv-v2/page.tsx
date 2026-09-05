import { CvSceneSwitch } from "@/components/cv-v2/cv-scene-switch";
import { CvSheetOne, CvSheets, CvSheetTwo } from "@/components/cv-v2/cv-sheets";
import { CvTableScene } from "@/components/cv-v2/cv-table-scene";
import { DownloadCVButton } from "@/components/DownloadCVButton";

export default function CvV2Page() {
  return (
    <>
      <CvSceneSwitch
        fallback={
          <CvTableScene>
            <CvSheets />
          </CvTableScene>
        }
        // Rendered here, on the server, so the sheets keep their
        // server-only content (the portfolio access code) even though the
        // scene that positions them is a client component.
        pages={[<CvSheetOne key="one" />, <CvSheetTwo key="two" />]}
      />
      <DownloadCVButton />
    </>
  );
}
