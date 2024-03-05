import { redirect } from "next/navigation";

export default function Page() {
  redirect(
    "https://docs.google.com/document/d/1s0MsvFlXIVX-qx2hkp_WBi0sm6y9oDBSR8-vJH07nCk/edit?usp=sharing",
  );
}
