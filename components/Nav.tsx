import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="wrapper sticky top-0 flex items-center justify-between bg-white">
      <Link
        href="/"
        className="whitespace-nowrap text-base font-medium sm:text-2xl"
      >
        <span className="text-brand">😘AI</span>
        PickupLines
      </Link>
      <a
        href="https://gumroad.com/"
        target="_blank"
        className="btn border-2 border-brand px-4 py-2 text-xs font-medium text-brand hover:bg-brand/10 sm:text-base"
      >
        buy on gumroad
      </a>
    </nav>
  );
}
