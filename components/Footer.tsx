import React from "react";

export default function Footer() {
  return (
    <footer className="wrapper bg-white text-center">
      Made with ❤️ by{" "}
      <span className="whitespace-nowrap">
        <a
          href="https://twitter.com/Vatsal_Sanghvi"
          target="_blank"
          rel="noreferrer"
          className="mb-1 border-b border-black"
        >
          Vatsal Sanghvi
        </a>{" "}
        &{" "}
        <a
          href="https://twitter.com/iwahabshaikh"
          target="_blank"
          rel="noreferrer"
          className="mb-1 border-b border-black"
        >
          Wahab Shaikh
        </a>
      </span>
    </footer>
  );
}
