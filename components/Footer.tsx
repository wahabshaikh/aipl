import React from "react";

export default function Footer() {
  return (
    // Feel free to update the footer's copy
    <footer className="mx-auto mt-16 w-full max-w-7xl px-8 pb-4 text-center text-black/70 sm:px-12">
      <p>
        Made with ❤️ by{" "}
        <span className="whitespace-nowrap">
          <a
            href="https://twitter.com/Vatsal_Sanghvi"
            target="_blank"
            rel="noreferrer"
            className="text-brand"
          >
            Vatsal Sanghvi
          </a>{" "}
          &{" "}
          <a
            href="https://twitter.com/iwahabshaikh"
            target="_blank"
            rel="noreferrer"
            className="text-brand"
          >
            Wahab Shaikh
          </a>
        </span>
        .{" "}
        <span className="whitespace-nowrap">
          Please check the{" "}
          <a
            href="https://aipickuplines.com/terms-of-use"
            target="_blank"
            rel="noreferrer"
            className="mb-1 border-b border-black"
          >
            terms of use
          </a>
          .
        </span>
      </p>
    </footer>
  );
}
