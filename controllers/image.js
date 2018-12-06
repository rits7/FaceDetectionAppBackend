const Clarifai = require('clarifai');

//must add your own clarifai api
const app = new Clarifai.App({
 apiKey: '0401c3c617cb4a6c81d89c889f9994dd' 
});


const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}