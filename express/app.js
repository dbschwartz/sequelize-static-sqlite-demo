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
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});


		app.get(
			`/movies`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getAll)
		);

		app.get(
			`/movies/:id`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getById)
		);


		app.get(
			`/movies/byYear/:year`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getByYear)
		);

		app.get(
			`/movies/byGenre/:genre`,
			makeHandlerAwareOfAsyncErrors(routes.movies.getByGenre)
		);

		
	


module.exports = app;
