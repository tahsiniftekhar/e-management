import db from "../../../model";
db.sequelize.sync();
const Event = db.events;

export default async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const eventData = await Event.findByPk(id);
      if (eventData !== null) {
        res.status(200).json({
          message: "Success",
          result: eventData,
        });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    } catch (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
  }

  // Update event by Id
  else if (req.method === "PUT") {
    const eventData = await Event.findByPk(id);
    const updatedData = {
        name: req.body.name ? req.body.name : eventData.name,
        location: req.body.location ? req.body.location : eventData.location,
        date: req.body.date ? req.body.date : eventData.date,
    }
    Event.update(
      updatedData,
      { where: { id } }
    )
      .then((results) => {
          console.log(results)
        if (!results[0]) {
            res.status(404).json({ message: "Failed to update" });
          
        } else {
            res
            .status(200)
            .json({ message: "Updated successfully", data: updatedData});
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "There was a server side error!",
        });
      });
  }

  // Delete event by Id
  else if (req.method === "DELETE") {
    Event.destroy({ where: { id } })
      .then((deletedRecord) => {
        if (deletedRecord === 1) {
          res.status(200).json({ message: "Deleted successfully" });
        } else {
          res.status(404).json({ message: "record not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "There was a server side error!",
        });
      });
  } else {
    return res.status(500).json({
      success: 0,
      message: "server side error",
    });
  }
};
