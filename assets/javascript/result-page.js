var similarGamesLength;

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'https://www.giantbomb.com/api/game/' + localStorage.getItem("guid") + '/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098'
}).done(function (response) {
    console.log(response);
    var result = response.results;
    var resultMainDiv = $('<div>');
    resultMainDiv.addClass('col-md-6');
    resultMainDiv.attr('id', 'result-main');

    var resultMainImg = $('<div>');
    resultMainImg.addClass('col-md-6');

    var h2 = $('<h2>').text(result.name);
    h2.attr('id', 'result-main-title');

    var gameRating;
    if (result.original_game_rating == null) {
        gameRating = "Not Rated";
    }
    else{
        gameRating = result.original_game_rating[0].name;
    }
    var h5Rating = $('<h5>').text('[Rating] ' + gameRating);
    h5Rating.addClass('text-category');

    var h4 = $('<h5>');
    var h4text = "[Genres] ";
    for (i = 0; i < result.genres.length; i++) {
     h4text = h4text + result.genres[i].name;
     if (i != (result.genres.length-1)){
        h4text = h4text + ", ";
     }
     h4.text(h4text);
    }
    h4.addClass('text-category');

    var p = $('<p>').text(result.deck);
    p.attr('id', 'result-main-deck');

    var img = $('<img>');
    img.addClass('image-fluid');
    img.attr('id', 'result-main-image');
    img.attr('src', result.image.original_url);

    // resultMainDiv.append(h5Date);
    resultMainImg.append(img);
    resultMainDiv.append(h2);
    resultMainDiv.append(h4);
    resultMainDiv.append(h5Rating);
    resultMainDiv.append(p);

    $('#result-main-container').append(resultMainImg);
    $('#result-main-container').append(resultMainDiv);

    if (result.similar_games === null) {
        similarGamesLength = 0;
    } else {
    similarGamesLength = result.similar_games.length;
    }

    for (i = 0; (i < similarGamesLength) && (i < 6); i++) {
        var guid = "3030-" + result.similar_games[i].id;
        var div = $('<div>');
        var h = $('<h5>').text(result.similar_games[i].name);
        h.addClass("card-title");
        div.addClass('card');
        div.addClass('col-md-4');
        div.attr('id', 'similar-div-' + i);
        div.attr('data-guid', guid);
        div.attr('data-api-url', guid);
        div.click(loadGamePage);
        div.append(h);
        $('#result-similar-container').append(div);
    }
    fetchCovers();
}).fail(function () {
    alert("ajax error");
});

async function fetchCovers() {
    for (i = 0; (i < similarGamesLength) && (i < 6); i++) {
        var currentguid = $('#similar-div-' + i).data('guid');
        await $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: 'https://www.giantbomb.com/api/game/' + currentguid + '/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098'
        }).done(function (response) {
            console.log('cover for ' + i);
            console.log(response);
            var imgsrc = response.results.image.icon_url;
            var img = $('<img>');
            img.addClass("game-image");
            img.attr('id', 'similar-game-img-'+i);
            img.attr('src', imgsrc);
            $('#similar-div-' + i).prepend(img);
        }).fail(function () {
            alert("ajax error");
        });
    }
}

function loadGamePage() {
    localStorage.setItem("guid", $(this).data("guid"));
    window.location = "results.html";
};