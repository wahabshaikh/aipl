import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import {
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandWhatsapp,
  TbCopy,
} from "react-icons/tb";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

interface ToolbarProps {
  pickupLine: string;
}

export default function Toolbar({ pickupLine }: ToolbarProps) {
  const shareUrl = "https://aipickuplines.com";

  return (
    <div className="space-x-2">
      <CopyToClipboard
        text={pickupLine}
        onCopy={() => toast.success("Copied to clipboard!")}
      >
        <button data-tip="Copy">
          <TbCopy className="h-6 w-6" />
        </button>
      </CopyToClipboard>

      <FacebookShareButton
        data-tip="Share on Facebook"
        url={shareUrl}
        quote={pickupLine}
      >
        <TbBrandFacebook className="h-6 w-6" />
      </FacebookShareButton>

      <TwitterShareButton
        data-tip="Share on Twitter"
        url={shareUrl}
        title={pickupLine}
      >
        <TbBrandTwitter className="h-6 w-6" />
      </TwitterShareButton>

      <WhatsappShareButton
        data-tip="Share on WhatsApp"
        url={shareUrl}
        title={pickupLine}
        separator=":: "
      >
        <TbBrandWhatsapp className="h-6 w-6" />
      </WhatsappShareButton>
    </div>
  );
}
