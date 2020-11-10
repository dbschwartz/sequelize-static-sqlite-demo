const { Sequelize, DataTypes } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const movies = require('./models/movies');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = {};

const moviesDB = new Sequelize({
	dialect: 'sqlite',
	storage: 'db/movies.db',
	logQueryParameters: true,
	benchmark: true
});


const ratingsDB = new Sequelize({
	dialect: 'sqlite',
	storage: 'db/ratings.db',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	require('./models/movies'),
	require('./models/ratings') //,	
	// require('./models/orchestra.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
// 	modelDefiner(sequelize);
// }
//ratingsDB.dialect.supports.schemas = true; 
sequelize.movies = require('./models/movies')(moviesDB, DataTypes);
sequelize.ratings = require('./models/ratings')(ratingsDB, DataTypes);


// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
