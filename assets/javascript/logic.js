const CARDSAMOUNT = 6;
const today = new Date().toISOString().slice(0, 10);
$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'https://www.giantbomb.com/api/games/?api_key=3e367e43b48af015b21cb7640630f3fa0e510098&filter=original_release_date:2019-01-01|'+today+',platforms:176&sort=original_release_date:desc&limit=6&format=jsonp'
}).done(function (response) {
    var result = response.results;
    console.log(result);
    for (i = 0; i < 6; i++) {
        var guid = "3030-" + result[i].id;
        var div = $('<div>');
        var h = $('<h5>').text(result[i].name);
        h.addClass("card-title");
        div.addClass('card');
        div.addClass('col-md-4');
        div.attr('id', 'similar-div-' + i);
        div.attr('data-guid', guid);
        div.attr('data-api-url', guid);
        div.click(loadGamePage);
        div.append(h);
        $('#trending-container').append(div);
    }
    fetchCovers();
}).fail(function () {
    alert("ajax error");
});

async function fetchCovers() {
    for (i = 0; i < 6; i++) {
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
            img.attr('data-guid', currentguid);
            img.attr('data-api-url', currentguid);    
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
            $('#similar-div-' + i).prepend(img);
        }).fail(function () {
            alert("ajax error");
        });
    }
}


$(document).ready(function () {
    $(".image-carousel-ad").click(function () {
        localStorage.setItem("guid", $(this).data("guid"));
        window.location = "results.html";
    });
});

$(document).ready(function () {
    $(".about-link").click(function () {
        localStorage.setItem("guid", $(this).data("guid"));
        window.location = "results.html";
    });
});

function loadGamePage() {
    localStorage.setItem("guid", $(this).data("guid"));
    window.location = "results.html";
};