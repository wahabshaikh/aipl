import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="sticky top-0 mx-auto flex w-full max-w-7xl items-center justify-between bg-white px-8 sm:px-12">
      <Link href="/">
        <img
          src="/images/aipickuplines.png"
          alt="aipickuplines"
          className="-ml-6 h-24 w-auto"
        />
      </Link>
      <div className="space-x-4">
        <Link
          href="/flirt-like-srk"
          className="btn whitespace-nowrap border-2 border-brand px-4 py-2 text-xs font-medium text-brand hover:bg-brand/10 sm:text-base"
        >
          Flirt like SRK!
        </Link>
        {/* <a
          data-tip="Lifetime access to AI-generated pickup lines"
          href="https://wahabshaikh.gumroad.com/l/pickup-lines-by-ai"
          target="_blank"
          className="btn whitespace-nowrap border-2 border-brand px-4 py-2 text-xs font-medium text-brand hover:bg-brand/10 sm:text-base"
        >
          get 100 pickup lines!
        </a> */}
      </div>
    </nav>
  );
}
