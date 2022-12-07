// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createRecord } from "../../lib/airtable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.body.name as string;
  const email = req.body.email as string;

  const recordId = await createRecord(name, email);

  res.status(200).json({ result: recordId ? true : false });
}
