const express = require("express");
const expressHbrs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  expressHbrs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// mongoose.connect("mongodb://localhost/nba-news-scraper", {
//   useNewUrlParser: true
// });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/nba-news-scraper";

mongoose.connect(MONGODB_URI);

require("./routes/sportroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, function() {
  console.log(
    "App running on port 3000! Click Here to access http://localhost:3050"
  );
});
