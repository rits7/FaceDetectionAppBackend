const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password, } = req.body;
	if (!email, !password){
		return res.status(400).json('Incorrect form submission');
	}

	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			//console.log(isValid);
			if (isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					//console.log(user);
					res.json(user[0])
				})
			.catch(err => res.status(400).json('Unable to get user'))
		} else {
			res.status(400).json('Wrong Credentials')	
		}	
	})
	.catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {
	handleSignin: handleSignin
}