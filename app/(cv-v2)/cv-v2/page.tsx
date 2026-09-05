import { CvSceneSwitch } from "@/components/cv-v2/cv-scene-switch";
import { CvSheets } from "@/components/cv-v2/cv-sheets";
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
      >
        <CvSheets />
      </CvSceneSwitch>
      <DownloadCVButton />
    </>
  );
}
