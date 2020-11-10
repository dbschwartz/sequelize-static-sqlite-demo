const { movies, ratings } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const Sequelize = require('sequelize');

const toDollars = val => `$${val.toLocaleString("en-US")}`;


async function getAll(req, res) {
	if (!req.query || !req.query.page)  {
		req.query.page = 1;
	}
	const users = (
	  await movies.findAll({
		attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
		offset: req.query.page >= 2 ? req.query.page - 1 * 50 : 0,
		limit: 5
	  })
	).map(({imdbId, title, genres, releaseDate, budget}) => ({
	  imdbId,
	  title,
	  genres,
	  releaseDate,
	  budget: toDollars(budget),
	}));
	res.status(200).json(users);
  }
  

async function getById(req, res) {
	const id = getIdParam(req);
	const movie = await movies.findOne({
		where: {movieId: id},
		attributes : {
			exclude: ['revenue']
		}
	});
	const ratingForMovie = await ratings.findOne({
		where: {movieId: id},
		attributes: ["rating"]
	});
	if (movie) {
		movie.dataValues.budget = toDollars(movie.dataValues.budget);
		res.status(200).json(Object.assign(movie.dataValues, ratingForMovie.dataValues))
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await movies.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await movies.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await movies.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
