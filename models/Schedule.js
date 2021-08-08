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
  created: { type: Date, default: Date.now },
  modified: Date,
});
ScheduleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Schedule", ScheduleSchema);
