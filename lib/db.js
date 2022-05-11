const db = require("../models/");
const dbConnect = db.mongoose;
const URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://embreo-vendor-approval:ySFLYx0vqlAtDuFS@cluster0.e90bp.mongodb.net/CompanyVendorApps?retryWrites=true&w=majority";

dbConnect
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

module.exports = dbConnect;