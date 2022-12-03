import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
if (!apiKey) throw new Error(`Please add AIRTABLE_API_KEY to .env!`);

const baseId = process.env.AIRTABLE_BASE_ID;
if (!baseId) throw new Error(`Please add AIRTABLE_BASE_ID to .env!`);

const base = new Airtable({ apiKey }).base(baseId);

export function createRecord(keyword: string, result: string) {
  base("Requests").create(
    {
      fld2OGu9YkWcWiw4h: keyword,
      fldOqVeAShs6GDTub: result,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record?.getId());
    }
  );
}
