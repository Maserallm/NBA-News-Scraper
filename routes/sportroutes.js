const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app) {
  app.get("/api/scrape", function(req, res) {
    axios
      .get("https://www.wsj.com/news/life-arts/sports")
      .then(function(response) {
        let $ = cheerio.load(response.data);

        $("article").each(function(i, element) {
          let title = $(element)
            .find("h3")
            .text();
          let summary = $(element)
            .find("p")
            .text();
          let link = $(element)
            .find("a")
            .attr("href");

          let image = $(element)
            .find("img")
            .attr("src");

          if (title && link && summary && image) {
            // Insert the data in the-daily-mail db
            db.Article.create({
              title: title,
              summary: summary,
              link: link,
              image: image
            })
              .then(data => console.log(data))
              .catch(err => console.log(err.message));
          }
        });
      });

    //res.send("Scrape Complete");
  });

  app.get("/api/articles", function(req, res) {
    db.Article.find({})
      .limit(10)
      .populate("comment")
      .then(data => res.json(data))
      .catch(err => res.json(err));
  });

  // app.get("/api/saved", function(req, res) {
  //   db.Article.find({ saved: true })
  //     .then(data => res.json(data))
  //     .catch(err => res.json(err));
  // });

  app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
      .then(function(commentData) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { comment: commentData._id },
          { new: true }
        );
      })
      .then(commentData => res.json(commentData))
      .catch(err => res.json(err));
  });
};
