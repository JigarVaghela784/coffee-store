import {  getMinifiedRecords, table } from "../../lib/airTable";


const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find record available or not
    const { Id, Name, Neighbourhood, Address, Voting, ImageUrl } = req.body;
    try {
      if (Id) {
        const findCoffeeStoreRecords = await table
          .select({ filterByFormula: `id="${Id}"` })
          .firstPage();
        console.log({ findCoffeeStoreRecords });
        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords)
          res.json(records);
        } else {
            //create record

          if (Name) {
            const createRecords = await table.create([
              {
                fields: {
                  Id,
                  Name,
                  Address,
                  Neighbourhood,
                  Voting,
                  ImageUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords)
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
