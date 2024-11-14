import Link from "next/link";

export default function Navbar() {
  const navItems = [
    {
      title: "Projects",
      href: "/projects"
    },
    {
      title: "Writing", 
      href: "/writing"
    },
    {
      title: "Contact",
      href: "/contact"
    }
  ];

  return <nav className="fixed w-full justify-center top-4 left-0 right-0 z-10 flex flex-row gap-4">
    {navItems.map((item) => (
      <Link key={item.title} href={item.href}>{item.title}</Link>
    ))}
  </nav>;
}