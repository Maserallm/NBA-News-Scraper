$(document).ready(function() {
  $.get("/api/scrape").then(function(res) {
    console.log(res);
    showData(res);
  });

  $.get("/api/articles").then(function(res) {
    console.log(res);
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
          <div class="comment" id="show-comment${res[i]._id}">Article Comments:</div>
          <textarea class='bodyinput' rows="4" cols="50" id="comment${res[i]._id}" name='body'></textarea><br>
          <button type="button" class="btn btn-warning add-comment hvr-grow" id="${res[i]._id}">Add Comment</button>
        </div>
      </div>
    `);

      if (res[i].comment) {
        $(`#show-comment${res[i]._id}`).html(
          `Article Comments: <br>${res[i].comment.body}`
        );
      } else {
        $(`#show-comment${res[i]._id}`).html(
          `Article Comments: There are currently no comments for this article, add one below.`
        );
      }
    }
  }
});

$(document).on("click", ".add-comment", function() {
  const commentId = $(this).attr("id");
  const articleComment = $(`#comment${commentId}`).val();

  $.ajax({
    method: "POST",
    url: "/articles/" + commentId,
    data: {
      body: articleComment
    }
  }).then(function(res) {
    console.log(res);
  });

  $(`#comment${commentId}`).val("");

  $.get("/api/articles").then(function(res) {
    showData(res);
  });
});
