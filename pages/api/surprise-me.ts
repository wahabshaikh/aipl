// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PICKUP_LINES } from "../../data/pickup-lines";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result =
    PICKUP_LINES[Math.floor(Math.random() * PICKUP_LINES.length)].result;

  res.status(200).json({ result });
}
