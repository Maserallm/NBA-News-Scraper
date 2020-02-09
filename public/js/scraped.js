$(document).ready(function() {
  $.get("/api/scrape").then(function(res) {
    createCard(res);
  });

  $.get("/api/articles").then(function(res) {
    createCard(res);
  });
});
