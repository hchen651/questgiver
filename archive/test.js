// Google CSE API test
var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + "game" + "&searchType=image&cx=015084081056955684922:ejzkcmko2ki&key=AIzaSyDMAd3zOHJzfhAWHpweYkdtIunLkpq6s5U";

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response)
    });