import { CvSheets } from "@/components/cv-v2/cv-sheets";
import { CvTableScene } from "@/components/cv-v2/cv-table-scene";

export default function CvV2Page() {
  return (
    <CvTableScene>
      <CvSheets />
    </CvTableScene>
  );
}
