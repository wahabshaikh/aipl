// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SRK_DIALOGUES } from "../../data/srk-dialogues";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result =
    SRK_DIALOGUES[Math.floor(Math.random() * SRK_DIALOGUES.length)];

  res.status(200).json({ result });
}
