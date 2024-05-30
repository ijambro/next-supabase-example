import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  label?: string;
  children?: string | ReactNode;
}

export default function LinkButton({ href, label, children }: Props) {
  return (
    <Link
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      href={href}
    >
      {label ?? children}
    </Link>
  );
}
