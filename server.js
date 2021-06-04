console.clear();

const express = require("express");
const app = express();
const path = require("path");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();

dbConnect();

app.use(express.json());
app.use("/api/user", require("./routes/user"));
app.use("/api/restaurant", require("./routes/restaurant"));
app.use("/api/item", require("./routes/item"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));
if (process.env.Node_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`🚀 server is running on http://Localhost:${PORT}..`)
);
