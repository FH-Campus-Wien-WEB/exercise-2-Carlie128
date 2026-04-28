const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

let movies = movieModel.moviesJson;

// Parse urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

//genres
app.get('/genres', (req, res) => {
	const genres = Array.from(
		new Set(
			movies.flatMap(movie => movie.Genres)
		)
	).sort();
	
	res.send(genres);
});

//filter genres
app.get('/movies', function (req, res) {
	if (req.query.genre) {
		const filteredMovies = movies.filter(movie => 
			movie.Genres && Array.isArray(movie.Genres) && movie.Genres.includes(req.query.genre)
		);
		res.send(filteredMovies);
	}
	else {
		res.send(movies);
	}
});

//specific movie
app.get('/movies/:imdbID', function (req, res) {
	const id = req.params.imdbID
	const movie = movies.find(movie => movie.imdbID === id);

	if (movie) {
		res.send(movie);
	}
	else {
		res.sendStatus(404);
	}
});

app.put('/movies/:imdbID', function(req, res) {
	const id = req.params.imdbID;
	const idx = movies.findIndex(movie => movie.imdbID === id);
	const newMovie = req.body;

	if (idx === -1) {
		movies.push(newMovie);
		res.status(201);
		res.send(newMovie);
	} else {
		movies[idx] = newMovie;
		res.sendStatus(200);
	}
});

app.post('/movies', function(req, res) {
	const newMovie = req.body;
	movies.push(newMovie);
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
