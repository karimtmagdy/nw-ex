const { Types, Schema, model } = require("mongoose");
const ExcelSchema = new Schema({}, { timestamps: true, collection: "excel" });

const Excel = model("Excel", ExcelSchema);
module.exports = { Excel };
