import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <LogoutLink>Log out</LogoutLink>
    </div>
  );
}
