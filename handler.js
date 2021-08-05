require("dotenv").config({ path: "./variables.env" });
const connectToDatabase = require("./db");
const Schedule = require("./models/Schedule");
const header = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
};
("use strict");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.create(JSON.parse(event.body))
      .then((schedule) =>
        callback(null, {
          statusCode: 200,
          headers: header,
          body: JSON.stringify(schedule),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the schedule.",
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findById(event.pathParameters.id)
      .then((schedule) =>
        callback(null, {
          statusCode: 200,
          headers: header,
          body: JSON.stringify(schedule),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedule.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.find()
      .then((schedules) =>
        callback(null, {
          statusCode: 200,
          headers: header,
          body: JSON.stringify(schedules),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedules.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      { new: true }
    )
      .then((schedule) =>
        callback(null, {
          statusCode: 200,
          headers: header,
          body: JSON.stringify(schedule),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedules.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findByIdAndRemove(event.pathParameters.id)
      .then((schedule) =>
        callback(null, {
          statusCode: 200,
          headers: header,
          body: JSON.stringify({
            message: "Removed schedule with id: " + schedule._id,
            schedule: schedule,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedules.",
        })
      );
  });
};
