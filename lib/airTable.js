const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_KEY);

export const table = base("Coffee-Stores");

const getMinifiedRecord=(record)=>{
    return {
        ...record.fields,
      };
}


export const getMinifiedRecords = (records) => {
  return records.map((record) => {
    return getMinifiedRecord(record)
  });
};
