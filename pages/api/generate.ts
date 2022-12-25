// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { PICKUP_LINES } from "../../data/pickup-lines";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const keyword = req.body.keyword as string;
    const lowercaseKeyword = keyword.toLowerCase();

    const results = PICKUP_LINES.filter(
      ({ keyword }) => keyword === lowercaseKeyword
    );

    if (results && results.length > 0) {
      const result = results[Math.floor(Math.random() * results.length)].result;

      res.status(200).json({ result });
    } else {
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

      const result = completion.data.choices[0].text?.trim();
      if (!result) throw new Error(`No result found!`);

      res.status(200).json({ result });
    }
  } catch (error) {
    console.error(error);
    res.status(408).json({ result: "" });
  }
}
