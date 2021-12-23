import db from "../../model";
db.sequelize.sync();
const Event = db.events;

export default async (req, res) => {
  if (req.method === "POST") {
    const newEvent = new Event({
      name: req.body.name,
      location: req.body.location,
      date: req.body.date ? req.body.date : null,
    });

    try {
      const event = await newEvent.save();

      res.status(200).json({
        message: "Event was created successfully!",
        data: event,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
  }

  // Retrieve all data from the database
  else if (req.method === "GET") {
    const getPagination = (page, size) => {
      const limit = size ? +size : 3;
      const offset = page ? page * limit : 0;

      return { limit, offset };
    };

    const getPagingData = (data, page, limit) => {
      const { count: totalItems, rows: events } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      return { totalItems, totalPages, events, currentPage };
    };

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    try {
      const eventData = await Event.findAndCountAll({
        limit,
        offset,
      });
      const response = getPagingData(eventData, page, limit);

      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "internal error!",
      });
    }
  }

  // Error handling
  else {
    return res.status(500).json({
      success: 0,
      message: "server side error",
    });
  }
};
