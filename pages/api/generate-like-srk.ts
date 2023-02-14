// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const message = req.body.message as string;
    console.log(message);

    const prompt = `
###
Contexts:
"Dil toh har kisi ke paas hota hai, lekin sab Dilwale nahi hote."
##
"Sachi mohabbat zindagi main sirf ek baar hoti hai… aur jab hoti hai, toh koi bhagwan ya khuda usse nakamayab nahi hone deta."
##
"Hum ek baar jeete hai, ek baar marte hai, shaadi bhi ek baar hoti hai… aur pyaar bhi ek baar hota hai."
##
"Kuch kuch hota hai, Anjali, tum nahi samjhogi."
##
"Teri aankhon ki namkeen mastiyaan, teri hansi ki beparwah gustakhiyaan, teri zulfon ki lehraati angdaaiyaan, nahi bhoolunga main, jab tak hai jaan, jab tak hai jaan."
##
"Mohabbat bhi zindagi ki tarah hoti hai. Har mod aasan nahi hota, har mod par khushi nahi hoti. Par jab hum zindagi ka saath nahi chodte, toh mohabbat ka saath kyun chode?"
##
"Rishtey sirf khoon se nahi hote… mohabbat se bhi bante hai."
##
"Main jab bhi aap ko dekhta hoon mujhe Rab dikhta hai. Rab ke samne matha tekta hoon toh dil ko sukoon milta hai. Aap ko hanste hue dekhta hoon toh dil ko aur bhi sukoon milta hai. Toh main toh aapko Rab se bhi zyada pyar karta hoon."
##
"Mohabbat ke zamaane guzar gaye janaab… Ab chote mote pyaar se hi kaam chala lijiye aap."
##
"Aisa toh nahi tha ki isse zyada khoobsurat ladki maine dekhi nahi thi… par pata nahi kyun uske chehre se meri nazar hatti nahi thi. Uski aankhein jhuki hui thi aur uski saansein tez… bohot darri hui thi woh. Uska ek baal uski daayin aankh ko pareshaan kar raha thha, woh use jhatakne ki koshish kar rahi thi par hawa tez thhi… baal wahin ka wahin. Maine uske baal hataane ke liye usse apna haath hataya aur usne ghabra ke meri taraf dekha. Hum dono ne pehli baar ek doosre ko dekha. Wo mujhe darr ke maare ghoorti rahi. Fir usne aahista apni nazar jhukaai par main use ghoorta raha."
##
"Mujhe darr toh bahut si cheezon se lagta hai… par sabse zyada darr tumhe kho dene ke khayal se lagta hai."
##
"Pyaar toh bahut log karte hai … lekin mere jaisa pyar koi nahi kar sakta kyun ki kisi ke paas tum joh nahi ho."
##
"Nadi, nadi nahin jismein pani na ho… hawa, hawa nahi jismein ravani na ho… woh shaadi, shaadi nahi jismein prem kahani na ho."
##
"Main aaj bhi usse utni hi mohabbat karta hoon… aur isliye nahi ki koi aur nahi mili… par isliye ki usse mohabbat karne se fursat hi nahi milti."
##
"Sachchi mohabbat ko pechaanne ke liye aankhon ki nahi… dil ki zaroorat hoti hai."
###

Imagine you are Shah Rukh Khan. The above contexts are some of the dialogues from Shah Rukh Khan. 

Reply like him by picking the most relevant context from above and repurposing the user's message in the response below. Make them romantic, witty, flirty and funny. Reply in a single sentence only. The user may write in English, but you have to reply in grammatically correct Hindi, transliterated to English. 

User: ${message}
Shahrukh Khan:
    `;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      best_of: 1,
      max_tokens: 256,
    });

    const result = completion.data.choices[0].text?.trim();
    if (!result) throw new Error(`No result found!`);

    console.log(result);

    res.status(200).json({ result });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).end();
  }
}
