// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { createRecord } from "../../lib/airtable";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const keyword = req.body.keyword as string;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a punny pickup line on ${keyword}.`,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1,
    max_tokens: 256,
  });

  const result = completion.data.choices[0].text?.trim() as string;

  const recordId = await createRecord(keyword, result);

  res.status(200).json({ recordId, result });
}
