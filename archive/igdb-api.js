var searchTerm = $("#search-term").val();
var queryURL = "https://api-v3.igdb.com/games/" + searchTerm + "&user-key=49795d92184399297c7fe9ed5ce376e0";
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        var results = response.docs;
        for (var i = 0; i < results.length; i++) {
            var articleDiv = $("<div>");
            var h = $("<h3>");
            h.text(results[i].snippet);
            h.attr("src", results[i].web_url)
            articleDiv.append(h);
            $("#input.articles").prepend(articleDiv);
        }
    });