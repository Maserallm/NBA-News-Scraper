$(document).ready(function() {
  $.get("/api/scrape").then(function(res) {
    showData(res);
  });

  $.get("/api/articles").then(function(res) {
    showData(res);
  });
});
