var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user:  process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

// app.get('/', function(req, res) {
// 	res.render('pages/login',{
// 		my_title:"Login Page"
// 	});
// });

// // registration page
// app.get('/register', function(req, res) {
// 	res.render('',{
// 		my_title:"Registration Page"
// 	});
// });



app.post('/register/add_user',function(req,res){
	// {
	// 	player_name:"Text Value",
	// 	player_year: "Year",
	// 	player_major: "major",
	// 	player_passing_yards : 10,
	// 	player_rushing_yards : 10,
	//  player_receiving_yards : 10
	// }
	var full_name = req.body.full_name;
	var user_name = req.body.user_name;
	var password_ = req.body.password_;
	var major_ = req.body.major_;
	var year_ = req.body.year_;
	var gpa_ = req.body.gpa_;
    var pronouns_ = req.body.pronouns_;


	var insert_statement = "INSERT INTO profile_page(full_name, username, password_, major, gpa, year, pronouns, experience, skills) VALUES('" + full_name + "','" +
	user_name + "','" + password_ + "','" + major_ + "','" + year_ + "','"+ gpa_ + "','" + pronouns_+"') ON CONFLICT DO NOTHING;";

	var profiles = 'select * from profile_page;';

	db.task('post-data', task => {
        return task.batch([
            task.any(insert_statement),
						task.any(profiles)
        ]);
    })
	
    .then(data => {
		res.render('/register/add_user',{
			my_title:"Profile",
			profiles: data[1],
			playerinfo: '',
			games: ''
		})
	})
	
    .catch(err => {
		console.log('Uh Oh I made an oopsie');
		req.flash('error', err);
		res.render('/register/add_user',{
			my_title: "Profile",
			profiles: '',
			playerinfo: '',
			games: ''
		})
	});

});




