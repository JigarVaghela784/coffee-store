import { getMinifiedRecords, table,findRecordsByFilter } from "../../lib/airTable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find record available or not
    const { id, name, neighbourhood, address, voting, imgUrl } = req.body;
    try {
      if (id) {
        const records = await findRecordsByFilter(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          //create record

          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      res.status(500);
      res.json({ message: "Error finding or creating store", error });
    }
  }
};

export default createCoffeeStore;
