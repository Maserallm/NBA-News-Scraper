module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/scraped", (req, res) => {
    res.render("scraped");
  });
};
