const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
//const pg = require('pg');


const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Test',
    database : 'awesome-brain'
  }
});

console.log(postgres.select('*').from ('users'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		}, 
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}

	]
}

app.get('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req, res)=> {
	bcrypt.compare('apples', '$2a$10$KKyfWofkmaB4JTvdNzrUHu0ehj2rlTKv7olYap6fTaTDiJTIlftxC', function(err, res) {
    console.log('First guess', res)
	})
	bcrypt.compare('veggies', '$2a$10$KKyfWofkmaB4JTvdNzrUHu0ehj2rlTKv7olYap6fTaTDiJTIlftxC', function(err, res) {
    console.log('Second guess', res)
   	})
	if(req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json('Success');		
	} else {
		res.status(400).json('Error logging in');
	}
	console.log(req.body.email);
	console.log(req.body.password);
	
})

app.post('/register', (req, res)=> {
/*	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
       	console.log(hash);
	});*/
	
	database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})


app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		res.status(400).json('Not found');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
})
	if(!found) {
		res.status(400).json('Not found');
	}
})



/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/


app.listen(3000, ()=>{
	console.log("App is running");
})

/*

/res = this is working
/signin --> POST = returns success/fail
/register --> POST = returns new created user
/profile/:userId--> GET = user
/image --> PUT --> user

*/
//  req.body.email and req.body.password. 