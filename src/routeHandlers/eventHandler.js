const pool = require("../config/database");

module.exports = {
  // Create an event
  createEvent: (data, callback) => {
    pool.query(
      `insert into events(name, location, date) values(?, ?, ?)`,
      [data.name, data.location, data.date],
      (err, result) => {
        if (err) {
          callback(err);
        }
        else {
        return callback(null, result);
        }
      }
    );
  },

  // Get all events
  getEvents: (callback) => {
    pool.query(`select * from events`, [], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  // Get an event by ID
  getEventByID: (id, callback) => {
    pool.query(`select * from events where id = ?`, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result[0]);
    });
  },

  // Update an event
  updateEvent: (data, callback) => {
    pool.query(
      `update events set name=?, location=?, date=? where id=?`,
      [data.name, data.location, data.date, data.id],
      (err, result) => {
        if (err) {
          console.log(err)
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  // Delete an event
  deleteEvent: (id, callback) => {
    pool.query(`delete from events where id=?`, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
};
