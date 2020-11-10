const { movies, ratings } = require('../../sequelize');
const { getIdentifer, getYearParam } = require('../helpers');
const { Op } = require('sequelize');

const toDollars = val => `$${val.toLocaleString("en-US")}`;
const offsetFormat = (page = 1) => (Number(page) - 1) * 50;
const mapper = ({imdbId, title, genres, releaseDate, budget}) => ({
	imdbId,
	title,
	genres,
	releaseDate,
	budget: toDollars(budget)
  });


async function getAll(req, res) {
	const offset = offsetFormat(req.query.page);
	const moviesByPage = (
	  await movies.findAll({
		attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
		offset,
		limit: 50
	  })
	).map(mapper);
	res.status(200).json(moviesByPage);
  }
  

async function getById(req, res) {
	const id = getIdentifer(req, 'id');
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

async function getByYear(req, res) {
	const year = getYearParam(req);
	const offset = offsetFormat(req.query.page);
	const moviesByYear = (
	  await movies.findAll({
		attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
		where: {
			releaseDate: {
				[Op.like]: `${year}%`
			}
		},
		order: [['releaseDate', 'DESC']],
		offset,
		limit: 50
	  })
	).map(mapper);
	res.status(200).json(moviesByYear);
  }

  async function getByGenre(req, res) {
	const genreId = getIdentifer(req, 'genre');
	const offset = offsetFormat(req.query.page);
	const moviesByGenre = (
	  await movies.findAll({
		attributes: ["imdbId", "title", "genres", "releaseDate", "budget"],
		where: {
			genres: {
				[Op.like]: `%: ${genreId},%`
			}
		},
		offset,
		limit: 50
	  })
	).map(mapper);
	res.status(200).json(moviesByGenre);
  }


module.exports = {
	getAll,
	getById,
	getByYear,
	getByGenre
};
