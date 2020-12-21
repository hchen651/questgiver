axios({
    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': '9e200e5f3ba806bf8825821dd078350c',
    },

    //https://api-docs.igdb.com/?javascript#examples-12 and https://api-docs.igdb.com/?javascript#game
    data: "fields *; where game = 104673;"
})
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });