const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_KEY);

export const table = base("Coffee-Stores");

const getMinifiedRecord = (record) => {

  return {
    recordId:record.id,
    ...record.fields,
  };
};

export const getMinifiedRecords = (records) => {
  return records.map((record) => {
    return getMinifiedRecord(record);
  });
};

export const findRecordsByFilter = async (Id) => {
  const findCoffeeStoreRecords = await table
    .select({ filterByFormula: `id="${Id}"` })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};
