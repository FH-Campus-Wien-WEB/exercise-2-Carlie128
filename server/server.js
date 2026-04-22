const express = require('express');
const path = require('path');
const fs = require('fs');

const movieModel = require('./movie-model.js');


const app = express();

app.use(express.static(path.join(__dirname, 'files')));
app.use(express.json());



function saveMovies() {
  const fileContent = `const movieModel = ${JSON.stringify(movieModel, null, 2)};\n\nmodule.exports = movieModel;\n`;

  fs.writeFileSync(
    path.join(__dirname, 'movie-model.js'),
    fileContent,
    'utf-8'
  );
}

//all movies
app.get('/movies', function (req, res) {
  res.json(Object.values(movieModel))
})


//raw data of movie model
app.get('/movie-model.js', function (req, res) {
  res.json(movieModel)
})

//single movie by id
app.get('/movies/:imdbID', function (req, res) {
  res.json(movieModel[req.params.imdbID] )
});

app.post('/movies', function (req, res) {
  const newMovie = req.body;
  const id = newMovie.imdbID || "tt" + Math.random().toString().slice(2, 9);

  newMovie.imdbID = id;
  movieModel[id] = newMovie;

  saveMovies();

  console.log("Neu hinzugefügt:", id);
  res.status(201).json(newMovie);
});

app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;

  if (!movieModel[imdbID]) {
    return res.sendStatus(404);
  }

  // FULL REPLACE 
  movieModel[imdbID] = 
  {
    ...req.body, imdbID 
  };

  saveMovies();

  console.log("Aktualisiert:", imdbID);

  return res.sendStatus(200);
});


app.listen(3000, () => {
  console.log("Server now listening on [localhost](http://localhost:3000/)");
});
