// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { updateRecord } from "../../lib/airtable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recordId = req.body.recordId as string;
  const feedback = req.body.feedback as "liked" | "disliked";

  updateRecord(recordId, feedback);

  res.status(200).json({});
}
