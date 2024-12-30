import Image from "next/image";
import Link from "next/link";
import MenuToggle from "./MenuToggle";

export default function Navbar() {
  return (
    <header>
      <nav className="border-b-2  border-gray-200 fixed top-0 w-full h-16 bg-white z-20">
        <ul className="max-w-7xl h-full mx-auto px-6 flex items-center bg-white">
          <li>
            <Link href="/">
              <Image
                src="/images/LogoFull.svg"
                alt="logo"
                width={173}
                height={30}
                className="transition-transform hover:scale-[1.02]"
              />
            </Link>
          </li>
          <div className="hidden sm:flex ml-auto items-center gap-8">
            <li className="hover-link">
              <Link href="#features">Features</Link>
            </li>
            <li className="hover-link">
              <Link href="#faq">FAQ</Link>
            </li>
            <li className="hover-link">
              <Link href="#contact">Contact</Link>
            </li>
          </div>
          <MenuToggle />
        </ul>
      </nav>
    </header>
  );
}
