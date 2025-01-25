import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="absolute top-0 w-full h-16">
        <ul className="max-w-7xl h-full mx-auto px-6 flex items-center">
          <li>
            <Link href="/">
              <Image
                src="/branding/logo-full.svg"
                alt="logo"
                width={193}
                height={32}
                className="transition-transform hover:scale-[1.02]"
              />
            </Link>
          </li>
          <div className="flex ml-auto items-center gap-8">
            <li className="hover-link">
              <Link href="#contact">Feedback</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
