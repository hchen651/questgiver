// Genre - API result

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'https://www.giantbomb.com/api/genres/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098'
}).done(function (response) {
    console.log(response);
    var results = response.results;
    for (i = 0; i < results.length; i++) {
        var formOption = $("<option>")
        formOption.text(results[i].name);
        formOption.attr("data-guid", results[i].guid);
        $("#input-genre").append(formOption);
    }
}).fail(function () {
    alert("ajax error");
});

//search for a specific game
$(document).ready(function () {
    $("#input-submit").click(function () {
        console.log("clicked");
        var gameInput = $("#input-keyword").val();
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098',
            data: {
                "query": gameInput,
                "resources": "game",
            },
        }).done(function (response) {
            console.log(response);
            $("#result-list-container").empty();
            var results = response.results;
            for (i = 0; i < results.length; i++) {
                var gameDiv = $("<div>");
                var h = $("<h4>");
                h.text(results[i].name);
                gameDiv.attr("data-guid", results[i].guid);
                gameDiv.click(loadGamePage);
                gameDiv.append(h);
                $("#result-list-container").append(gameDiv);
            }
        }).fail(function () {
            alert("ajax error");
        })
    });
});

function loadGamePage() {
    localStorage.setItem("guid", $(this).data("guid"));
    window.location = "results.html";
};

$("#input-keyword").keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log("pressed enter");
        var gameInput = $("#input-keyword").val();
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098',
            data: {
                "query": gameInput,
                "resources": "game",
            },
        }).done(function (response) {
            console.log(response);
            $("#result-list-container").empty();
            var results = response.results;
            for (i = 0; i < results.length; i++) {
                var gameDiv = $("<div>");
                var h = $("<h3>");
                h.text(results[i].name);
                gameDiv.attr("data-guid", results[i].guid);
                gameDiv.click(loadGamePage);
                gameDiv.append(h);
                $("#result-list-container").append(gameDiv);
            }
        }).fail(function () {
            alert("ajax error");
        })
    }
});
