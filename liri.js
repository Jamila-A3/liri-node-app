require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment")
var axios = require("axios");



var expression = process.argv[2];
var artist = process.argv.slice(3).join(" ");

function consert() {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // handle success
            for (i = 0; i < response.data.length; i++) {
                console.log("------------------------------------------------");
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.city);
                console.log("Venue date: " + response.data[i].datetime);
            }


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function movie() {
    axios.get("http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // console.log(response);
            console.log("Movie name: " + response.data.Title);
            console.log("Movie date: " + response.data.Year);
            console.log("Movie imdbrating: " + response.data.imdbRating);
            console.log("Movie rating: " + response.data.Ratings[1].Value);
            console.log("Movie country: " + response.data.Country);
            console.log("Movie language: " + response.data.Language);
            console.log("Movie plot: " + response.data.Plot);
            console.log("Movie actors: " + response.data.Actors);


            // handle success
            //   for(i=0; i<response.data.length; i++){
            //     console.log("------------------------------------------------");  
            //     console.log("Movie name: "+response.data[i].venue.name); 
            //     console.log("Venue location: "+response.data[i].venue.city);
            //     console.log("Venue date: "+response.data[i].datetime); 
            //   }


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
function songs() {
    spotify.search({ type: 'track', query: artist }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            console.log("------------------------------------------------");
            console.log("Artist name: " + data.tracks.items[i].artists[0].name);
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Song Preview: " + data.tracks.items[i].preview_url);

            // console.log(data.tracks.items);
        };

    })


}

switch (expression) {
    case "consert-this":
        consert();
        break;
    case "spotify-this-song":
        console.log("This is song.")
        songs();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":

        break;
    // code block
}