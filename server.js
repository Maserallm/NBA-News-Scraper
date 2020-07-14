const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const express = require("express");
const expressHbrs = require("express-handlebars");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3006;
const app = express();

app.use(morgan("dev"));
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

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./routes/sportroutes")(app);
require("./routes/htmlroutes")(app);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  app.listen(PORT, function() {
    console.log(
      "App running on port 3006! Click Here to access http://localhost:3006"
    );
  });

  console.log(`Worker ${process.pid} started`);
}
