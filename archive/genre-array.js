var dropdown = [];
var dict = {
    name: "",
    guid: "",
};
$("#clickhead").click(function () {
    $.ajax({
        url: "https://www.giantbomb.com/api/genre/",
        dataType: "jsonp",
        jsonp: 'json_callback',
        data: {
            api_key: '3e367e43b48af015b21cb7640630f3fa0e510098',
            format: 'jsonp',
        },
    })
        .then(function (response) {
            console.log(response);
            var results = response.docs;
            for (var i = 0; i < results.length; i++) {
                var d = new dict;
                d.name = results.name;
                d.guid = results.guid;
                dropdown.push(d);
            }
        });
});
