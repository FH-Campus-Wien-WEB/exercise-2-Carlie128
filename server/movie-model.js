const BASE_URL_OMDB = 'https://www.omdbapi.com/';
const APIKEY = '25032d75';

const moviesJson = require('./movies.json');

async function fetchMovieById(id) {
	try {
		const res = await fetch(`${BASE_URL_OMDB}?apikey=${APIKEY}&i=${id}`);
		if (!res.ok)
			throw new Error('Error on fetching movie data');
		
		const data = await res.json();
		
		return {
				imdbID: data.imdbID,
				Title: data.Title,
				Released: new Date(data.Released),
				Runtime: new Number(data.Runtime.split(' ')[0]),
				Genres: data.Genre.split(',').map(genre => genre.trim()),
				Directors: data.Director.split(',').map(director => director.trim()),
				Writers: data.Writer.split(',').map(writer => writer.trim()),
				Actors: data.Actors.split(',').map(actor => actor.trim()),
				Plot: data.Plot,
				Poster: data.Poster,
				Metascore: new Number(data.Metascore),
				imdbRating: new Number(data.imdbRating)
		};
	} catch (error) {
		console.error("Error while fetching movie data from OMDB API: ", error);
	}
};

async function fetchMovies() {
	const movieIds = ['tt0145487', 'tt0316654', 'tt0413300', 'tt0948470', 'tt1872181', 'tt2250912', 'tt6320628', 'tt10872600'];
	return await Promise.all(movieIds.map(id => fetchMovieById(id)))
};

module.exports = {
	fetchMovies,
	moviesJson
}
