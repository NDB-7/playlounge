"use client";
export function SessionInUse({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-8 text-2xl text-center mx-auto px-4 max-w-3xl">
      {children}
    </h1>
  );
}
