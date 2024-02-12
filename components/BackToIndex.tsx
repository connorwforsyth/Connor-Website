import Link from "next/link";

export default function IndexLink() {
  return (
    <Link basics-link="" href="/">
      <div>
        <span
          data-icon="arrow-left-curve"
          aria-label="arrow-left-curve icon"
          basics-css-icon=""
        ></span>
        <span basics-text="">
          <em>Index</em>
        </span>
      </div>
    </Link>
  );
}
