$(document).ready(function() {
  $.get("/api/scrape").then(function(res) {
    showData(res);
  });

  $.get("/api/articles").then(function(res) {
    showData(res);
  });

  function showData(res) {
    for (let i = 0; i < res.length; i++) {
      $("#article").append(`
      <div class="card">
        <div class="card-header">
          <h3>
            <a class="article-link" target="_blank" href="${res[i].link}">${res[i].title}</a>
          </h3>
        </div>
        <div class="card-body">
          ${res[i].summary}
          <hr>
          
          <textarea class='bodyinput' id="comment${res[i]._id}" name='body'></textarea><br>
          <button type="button" class="btn btn-warning add-comment" id="${res[i]._id}">Add Comment</button>
        </div>
      </div>
    `);
    }
  }
});
