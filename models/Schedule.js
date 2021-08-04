const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  schedule: Array,
  datesArr: Array,
  comments: String,
});
module.exports = mongoose.model("Schedule", ScheduleSchema);
