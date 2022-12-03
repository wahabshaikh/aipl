import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
if (!apiKey) throw new Error(`Please add AIRTABLE_API_KEY to .env!`);

const baseId = process.env.AIRTABLE_BASE_ID;
if (!baseId) throw new Error(`Please add AIRTABLE_BASE_ID to .env!`);

const base = new Airtable({ apiKey }).base(baseId);

export async function createRecord(keyword: string, result: string) {
  return new Promise((resolve, reject) => {
    base("Requests").create(
      {
        fld2OGu9YkWcWiw4h: keyword,
        fldOqVeAShs6GDTub: result,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(record?.getId());
        resolve(record?.id);
      }
    );
  });
}

export function updateRecord(recordId: string, feedback: "liked" | "disliked") {
  base("Requests").update(
    recordId,
    {
      fldMRerxGzXg6lYyw: feedback,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record?.getId(), record?.get("Feedback"));
    }
  );
}
