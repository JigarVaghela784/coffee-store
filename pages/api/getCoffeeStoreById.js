import {
  getMinifiedRecords,
  table,
  findRecordsByFilter,
} from "../../lib/airTable";
const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordsByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `Id cannot be found` });
      }
    } else {
      res.status(400);
      res.json({ message: "Id is missing" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong:", error });
  }
};

export default getCoffeeStoreById;
