// Game Search
function getGameGuid(gameTitle) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098',
        data: {
            "query": gameTitle,
            "resources": "game",
        }
    }).done(function (response) {
        console.log(response);
        var results = response.results;
        console.log(results[0].guid);
        return results[0].guid;
    });
}

// Game Search test
function getGameGuidTest(gameTitle) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098',
        data: {
            "query": gameTitle,
            "resources": "game",
            "limit": 1,
        }
    }).then(function (response) {
        searchGuid(response.results[0].guid);
    });
}

// GUID Lookup
function searchGuid(guid) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'https://www.giantbomb.com/api/game/' + guid + '/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098',
    }).done(function (response) {
        console.log(response);
    });

}

// dependent searchGuid 

function searchGuidTest(game) {
    var a1 = getGameGuidTest(game),
        a2 = a1.then(function (data) {
            // .then() returns a new promise
            return searchGuid(data.results[0].guid);
        });

    a2.done(function (data) {
        console.log(data);
    });
}