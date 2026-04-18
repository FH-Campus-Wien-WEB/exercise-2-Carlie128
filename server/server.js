const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));


app.get('/movies', function (req, res) {
  res.json(Object.values(movieModel))
})

app.get('/movie-model.js', function (req, res) {
  res.json(movieModel)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  res.json(movieModel[req.params.imdbID] )
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  if (movieModel[imdbID]) {
    movieModel[imdbID] = { ...movieModel[imdbID], ...req.body };
    res.json(movieModel[imdbID]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

