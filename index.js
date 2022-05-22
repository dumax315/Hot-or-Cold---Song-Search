const express = require('express');

const app = express();
const path = require('path');

app.use(express.static('public'))

const axios = require('axios').default;
const request = require('request');
const topsongs = require("./public/topsongs.json")
// console.log(topsongs[40])
let currentSongToday = topsongs[Math.floor(Math.random() * 110)]
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html', );
});

app.get('/currentSong', (req, res) => {
	console.log(currentSongToday);
  res.send(currentSongToday);
});
//https://accounts.spotify.com/authorize?response_type=code&client_id=c23ffbef2e5d495da1aaa3e8e675998d&redirect_uri=https%3A%2F%2FHot-or-Cold-Song-Search.theohal.repl.co%2Fcallback
const code = "AQD14iMHrc9Bi8n0aPXXnLj9K6QOSWv5w2o6KaAVyKhEASNcqMH_G8KhUtZejTv252tgpfAPjBqtAlxkYIGrNS8shUMd510v5ZJ-gJsYxw5WjAit6DOzSiIjZBb9pYahszoaiig_ePTfOhEVei07zlTp9i1K1FQPef5yPbqxo_uksf_WhKZgXmjgN3czNEod36HAxYeRmsI2_kUJ"
const myurl = "https%3A%2F%2FHot-or-Cold-Song-Search.theohal.repl.co%2Fcallback"
const clientId = process.env['clientId']
const client_secret = process.env['clientSecret']


// db.set("authToken", "AQDeOnq46GImRkcpG9HCqrnI4f-FQIf4so5KV8K2GnUmZjWGlwMKbquY-BiPYGhIajmOFeXRnaDOLm7fv4LAhnDSWYtgex1h9V-ZgOuRta-icL0gELs9oXhkLt01312tT1Y").then(() => {});

app.get('/refresh_token', function(req, res) {

  var refresh_token = "AQDeOnq46GImRkcpG9HCqrnI4f-FQIf4so5KV8K2GnUmZjWGlwMKbquY-BiPYGhIajmOFeXRnaDOLm7fv4LAhnDSWYtgex1h9V-ZgOuRta-icL0gELs9oXhkLt01312tT1Y";
;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;

      res.send({
        'access_token': access_token,
      });
    }
  });
});



app.listen(3000, () => {
  console.log('server started');
});
