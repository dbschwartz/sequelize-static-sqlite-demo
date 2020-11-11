const express = require('express');
const bodyParser = require('body-parser');

const routes = {
	movies: require('./routes/movies'),
	// Add more routes here...
	// items: require('./routes/items'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`
	<h2 id="see-it-in-action">See it in action</h2>
	<ul>
	<li>Install dependencies with <code>npm install</code> or <code>yarn install</code></li>
	<li>Run the express server with <code>npm start</code></li>
	<li>Open your browser in <code>localhost:8080</code> and try the example REST endpoints:<ul>
	<li><code>localhost:8080/movies/?page=1</code> (GET)</li>
	<li><code>localhost:8080/movies/byId/:id</code> (GET)</li>
	<li><code>localhost:8080/movies/byYear/:year?page=1</code> (GET)</li>
	<li><code>localhost:8080/movies/byGenre/:genreId?page=1</code> (GET)</li>
	<li>pages are served 50 results at a time</li>
	</ul>
	</li>
	</ul>
	<h2 id="license">License</h2>
	<p>MIT</p>	
	`);
});
		app.get(
			`/movies`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getAll)
		);

		app.get(
			`/movies/byId/:id`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getById)
		);


		app.get(
			`/movies/byYear/:year`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getByYear)
		);

		app.get(
			`/movies/byGenre/:genreId`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getByGenre)
		);

		app.use(function (err, req, res, next) {
			//logging err.stack
			console.error(err.stack)
			res.status(500).json({error: 500, message:'Internal Server Error, please contact Tech Support'})
		  })
		
	


module.exports = app;
