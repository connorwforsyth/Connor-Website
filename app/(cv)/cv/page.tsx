import { CvActions } from "./_components/cv-actions";
import { CvDocument } from "./_components/cv-document";
import { PaperLanding } from "./_components/paper-landing";

export default function CvPage() {
  return (
    <>
      <CvActions />
      <PaperLanding>
        <CvDocument />
      </PaperLanding>
    </>
  );
}
