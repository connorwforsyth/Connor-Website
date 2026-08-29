import Link from "next/link";

export default function Navbar() {
  const navItems = [
    {
      href: "/projects",
      title: "Projects",
    },
    {
      href: "/writing",
      title: "Writing",
    },
    {
      href: "/contact",
      title: "Contact",
    },
  ];

  return (
    <nav className="fixed top-4 right-0 left-0 z-10 flex w-full flex-row justify-center gap-4">
      {navItems.map((item) => (
        <Link href={item.href} key={item.title}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
