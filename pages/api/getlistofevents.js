const AirtablePlus = require('airtable-plus');

export default async (req, res) => {
  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Events",
    // transform: r => {
    //   r.fields.id = r.id;
    //   return r.fields;
    // }
    transform: r => {
      return r.fields.name;
    }
  });

  const data = await airtable.read();

  res.status(200).json(data);
}
