import React from "react";

export default function Banner() {
  return (
    // Feel free to update the banner's copy and the url that it redirects to when you click on it
    <a
      href="https://avatarize.club"
      target="_blank"
      className="bg-brand p-2 text-center text-xs font-medium text-white"
    >
      Increase your matches by 70% with special Dating Avatars at{" "}
      <span>Avatarize.Club</span>. Use code{" "}
      <span className="font-bold">AIPICKUPLINES25</span> for a cool 25%. Limited
      Period Offer. Now!
    </a>
  );
}
