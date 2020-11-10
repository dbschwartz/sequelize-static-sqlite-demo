// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdentifer(req, idName) {
	const id = req.params[idName];
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':${idName}' param: "${id}"`);
}

function getYearParam(req) {
	const year = req.params.year;
	if (/^\d{4}$/.test(year)) {
		return Number.parseInt(year, 10);
	}
	throw new TypeError(`Invalid ':year' param: "${year}"`);
}

module.exports = { getIdentifer, getYearParam };
