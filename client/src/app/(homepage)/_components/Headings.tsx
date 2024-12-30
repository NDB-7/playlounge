import { Figtree } from "next/font/google";

const figtree = Figtree({
  weight: ["700"],
  subsets: ["latin"],
});

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`${figtree.className} text-center text-4xl md:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`${figtree.className} text-3xl lg:text-4xl ${className}`}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`${figtree.className} text-2xl ${className}`}>{children}</h2>
  );
}
