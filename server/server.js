const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

let movies = movieModel.moviesJson;

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

/* Task 1.2: Add a GET /genres endpoint:
	 This endpoint returns a sorted array of all the genres of the movies
	 that are currently in the movie model.
*/
app.get('/genres', (req, res) => {
	const genres = Array.from(
		new Set(
			movies.flatMap(movie => movie.Genres)
		)
	).sort();
	
	res.send(genres);
});

/* Task 1.4: Extend the GET /movies endpoint:
	 When a query parameter for a specific genre is given,
	 return only movies that have the given genre
 */
app.get('/movies', function (req, res) {
	if (req.query.genre) {
		const filteredMovies = movies.filter(movie => movie.Genres.includes(req.query.genre));
		res.send(filteredMovies);
	}
	else {
		res.send(movies);
	}
});

// Configure a 'get' endpoint for a specific movie
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

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
