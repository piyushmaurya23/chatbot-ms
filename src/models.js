var mongoose = require("mongoose");

var ConfigSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  webhookUrl: String,
  apiSecret: String,
});
mongoose.model("Config", ConfigSchema);

module.exports = mongoose.model("Config");
