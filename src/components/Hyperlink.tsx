import { type ReactNode } from "react";

export default function Hyperlink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="underline hover:opacity-60 dark:hover:opacity-80">
      {children}
    </a>
  );
}
