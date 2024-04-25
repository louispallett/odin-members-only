const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String },
    content: { type: String, required: true },
    date: { type: Date, required: true }
});


MessageSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model("Message", MessageSchema);