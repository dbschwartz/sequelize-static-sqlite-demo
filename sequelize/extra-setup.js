function applyExtraSetup({ratings, movies}) {
	//const { instrument, orchestra } = sequelize.models;
	movies.hasOne(ratings, {foreignKey: {
		name: 'movieId'
	  }});
	ratings.belongsTo(movies);


	// orchestra.hasMany(instrument);
	// instrument.belongsTo(orchestra);
}

module.exports = { applyExtraSetup };
