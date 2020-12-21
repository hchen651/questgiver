async function initialCall(){
    axios({
        url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': '9e200e5f3ba806bf8825821dd078350c',
        },
        //https://api-docs.igdb.com/?javascript#examples-12 and https://api-docs.igdb.com/?javascript#game
        data: "fields name,popularity; sort popularity desc;"
    })
        .then(async response => {
            var results = response.data;
            // var gameArray = [];
            // console.log(response.data[0].name);
            // for (var j = 0; j < 4; j++){
            //     var gameName = response.data[j].name;
            //     gameArray.push(gameName);
            // }
            // console.log(gameArray);
            for (var i = 0; i < 4; i++) {
                var cardDiv = $('<div>');
                cardDiv.addClass("card");
                cardDiv.attr("id", "card-div-"+i)
                cardDiv.addClass("col-3");
                var h = $("<h5>").text(results[i].name);
                h.addClass("card-title");
                var p = $("<p>").text(results[i].summary)
                var img = $("<img>");
                img.addClass("game-image");
                img.attr("id", "game-image-"+i)
                img.attr("data-gameid", results[i].id);
                const imgLocation = await getCover(results[i].id);
                console.log(imgLocation);
                img.attr("src", "https://via.placeholder.com/100");
                cardDiv.append(img);
                cardDiv.append(h);
                cardDiv.append(p);
                $("#card-container").append(cardDiv);
            }
            // await 
            fetchCovers();
        })
        .catch(err => {
            console.error(err);
        });
    };
    initialCall();
    
    async function fetchCovers(){
        for (var i = 0; i < 4; i++) {
            var img = $("#game-image-"+i);
            var currentGameID = img.data("gameid");
            let imgsrc = await getCover(currentGameID);
            console.log(imgsrc);
            img.attr("src", "https://via.placeholder.com/200");
            $("#card-div-"+i).prepend(img);
        }
    };
    
    function getCover(id) {
        axios({
            url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '9e200e5f3ba806bf8825821dd078350c',
            },
            //https://api-docs.igdb.com/?javascript#examples-12 and https://api-docs.igdb.com/?javascript#game
            data: "fields *; where game = " + id + ";"
        })
        .then(response => {
            var results = response.data;
            console.log(results[0].url);
            imgsrc = results[0].url;
            return results[0].url;
        })
        .catch(err => {
            console.error(err);
        });
    };
    
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'jsonp',
    //     crossDomain: true,
    //     jsonp: 'json_callback',
    //     url: 'http://www.giantbomb.com/api/games/?format=jsonp&api_key=3e367e43b48af015b21cb7640630f3fa0e510098'
    // }).done(function (response) {
        
    //     console.log(response.results[0].guid);
        
    // }).fail(function () {
    //     alert("ajax error");
    // });
    
    // Google CSE API test
    var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + "game" + "&searchType=image&cx=015084081056955684922:ejzkcmko2ki&key=AIzaSyDMAd3zOHJzfhAWHpweYkdtIunLkpq6s5U";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            console.log(response)
        });