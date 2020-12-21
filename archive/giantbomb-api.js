//var queryURL = "https://www.giantbomb.com/api/games/?api_key=3e367e43b48af015b21cb7640630f3fa0e510098";

// if ($("#name-field").value() != ""){
//     queryURL = queryURL + "&filter=name" + $("#name-field").value();
// }
// if ($("#genre-field").value() != ""){
//     queryURL = queryURL + "&filter=name" + $("#genre-field").value();
// }

// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//     .then(function (response) {
//         var results = response.docs;
//         for (var i = 0; i < results.length; i++) {
//             var gameDiv = $("<div>");
//             var h = $("<h3>");
//             h.text(results[i].name);
//             h.attr("src", results[i].web_url)
//             articleDiv.append(h);
//             $("#results-container").prepend(articleDiv);
//         }
//     });

var searchTerm = "final fantasy";

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'http://www.giantbomb.com/api/genres/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098'
}).done(function (response) {
    console.log(response)
}).fail(function () {
    alert("error");
}).always(function () {
    alert("complete");
});