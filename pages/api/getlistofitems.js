const AirtablePlus = require('airtable-plus');

export default async (req, res) => {
  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: req.query.event,
    transform: r => {
      r.id = r.fields.id;
      r = r.fields
      r.picture = r.picture[0].url;
      return r;
    }
  });

  const data = await airtable.read();

  res.status(200).json(data);
}
