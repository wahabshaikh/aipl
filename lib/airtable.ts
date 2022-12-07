import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
if (!apiKey) throw new Error(`Please add AIRTABLE_API_KEY to .env!`);

const baseId = process.env.AIRTABLE_BASE_ID;
if (!baseId) throw new Error(`Please add AIRTABLE_BASE_ID to .env!`);

const base = new Airtable({ apiKey }).base(baseId);

export async function createRecord(Name: string, Email: string) {
  return new Promise((resolve, reject) => {
    base("Users").create(
      {
        Name,
        Email,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          reject(err);
        }

        resolve(record?.id);
      }
    );
  });
}
