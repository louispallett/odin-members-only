const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String },
    content: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model("Message", MessageSchema);