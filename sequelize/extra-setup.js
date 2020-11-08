function applyExtraSetup({ratings, movies}) {
	//const { instrument, orchestra } = sequelize.models;
	ratings.hasMany(movies, { foreignKey: 'movieId'})

	// orchestra.hasMany(instrument);
	// instrument.belongsTo(orchestra);
}

module.exports = { applyExtraSetup };
