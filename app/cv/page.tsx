import { redirect } from "next/navigation";

export default function Page() {
  redirect(
    "https://docs.google.com/document/d/1s0MsvFlXIVX-qx2hkp_WBi0sm6y9oDBSR8-vJH07nCk",
  );
  // return (
  //   <iframe
  //     className="mx-auto h-[2000px] w-full max-w-4xl"
  //     src="https://docs.google.com/document/d/e/2PACX-1vT7j0KNvwlPhRni_IMC0qJEsZU0IEEPMaFQv79PQ3fSPOFIL0lowRyb7Mu20KHv-nWmyGtCtVXENXnW/pub?embedded=true"
  //   ></iframe>
  // );
}
