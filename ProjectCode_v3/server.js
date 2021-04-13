/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
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
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'profile_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



/*********************************
 Below we'll add the get & post requests which will handle:
   - Database access
   - Parse parameters from get (URL) and post (data package)
   - Render Views - This will decide where the user will go after the get/post request has been processed

 Web Page Requests:

  Login Page:        Provided For your (can ignore this page)
  Registration Page: Provided For your (can ignore this page)
  Home Page:
  		/home - get request (no parameters)
  				This route will make a single query to the favorite_colors table to retrieve all of the rows of colors
  				This data will be passed to the home view (pages/home)

  		/home/pick_color - post request (color_message)
  				This route will be used for reading in a post request from the user which provides the color message for the default color.
  				We'll be "hard-coding" this to only work with the Default Color Button, which will pass in a color of #FFFFFF (white).
  				The parameter, color_message, will tell us what message to display for our default color selection.
  				This route will then render the home page's view (pages/home)

  		/home/pick_color - get request (color)
  				This route will read in a get request which provides the color (in hex) that the user has selected from the home page.
  				Next, it will need to handle multiple postgres queries which will:
  					1. Retrieve all of the color options from the favorite_colors table (same as /home)
  					2. Retrieve the specific color message for the chosen color
  				The results for these combined queries will then be passed to the home view (pages/home)

  		/team_stats - get request (no parameters)
  			This route will require no parameters.  It will require 3 postgres queries which will:
  				1. Retrieve all of the football games in the Fall 2018 Season
  				2. Count the number of winning games in the Fall 2018 Season
  				3. Count the number of lossing games in the Fall 2018 Season
  			The three query results will then be passed onto the team_stats view (pages/team_stats).
  			The team_stats view will display all fo the football games for the season, show who won each game,
  			and show the total number of wins/losses for the season.

  		/player_info - get request (no parameters)
  			This route will handle a single query to the football_players table which will retrieve the id & name for all of the football players.
  			Next it will pass this result to the player_info view (pages/player_info), which will use the ids & names to populate the select tag for a form
************************************/

// login page
app.get('/', function(req, res) {
	res.render('pages/login',{
		local_css:"login.css",
		my_title:"Login Page"
	});
});

// registration page
app.get('/register', function(req, res) {
	res.render('pages/register',{
		my_title:"Registration Page"
	});
});

//profile page
app.get('/profile', function(req, res) {
	res.render('pages/profile',{
		my_title:"Profile Page"
	});
});

//settings page
app.get('/settings', function(req, res) {
	res.render('pages/settings',{
		my_title:"Settings Page"
	});
});

//email index page
app.get('/index', function(req, res) {
	res.render('pages/index',{
		my_title:"Email Page"
	});
});

/*Add your other get/post request handlers below here: */
app.get('/register/add_user', function(req, res) {
	var profiles =  'select * from user_table;';// Write a SQL query to retrieve the colors from the database
	db.task('get-everything', task => {
        return task.batch([
            task.any(profiles),
        ]);
    })
    .then(info => {
		console.log("made it in here bruh!!");
    	res.render('pages/register', {
				my_title: "Register",
				data: info[0], 
			})
    })
    .catch(err => {
            console.log('There was an error!!!! in the get', err);
            res.render('pages/register', {
                my_title: 'Register',
                data: '',
                color: '',
                color_msg: ''
            })
    });

});

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
	var experience_= req.body.experience_;
	var skills_= req.body.skills_;
	var question_ = req.body.question_;



	var insert_statement = "INSERT INTO user_table(full_name, username, password_, major, gpa, year, pronouns, experience, skills, question) VALUES('" + full_name + "','" +
	user_name + "','" + password_ + "','" + major_ + "','" + gpa_ + "','"+ year_ + "','" + pronouns_+ "','" + experience_ + "','" + skills_ + "','"+ question_ +"') ON CONFLICT DO NOTHING;";

	var profiles = 'select * from user_table;';

	db.task('post-data', task => {
        return task.batch([
            task.any(insert_statement),
						task.any(profiles)
        ]);
    })
	
    .then(data => {
		res.render('pages/login',{
			my_title:"Profile",
			profiles: data[1],
			
			
		})
	})
	
    .catch(err => {
		console.log('Uh Oh I made an oopsie');
		req.flash('error', err);
		res.render('/home',{
			my_title: "Profile",
			profiles: '',
			playerinfo: '',
			games: ''
		})
	});

});

app.get('/home/pick_color', function(req, res) {
	var color_choice = req.query.color_selection; // Investigate why the parameter is named "color_selection"
	var color_options =  'select * from favorite_colors;';// Write a SQL query to retrieve the colors from the database
	var color_message = 'select color_msg from favorite_colors where hex_value=\''+color_choice+'\';';  // Write a SQL query to retrieve the color message for the selected color
	console.log("This is req inside of /home/pick_color", req, "This is res", res);
	db.task('get-everything', task => {
        return task.batch([
            task.any(color_options),
            task.any(color_message)
        ]);
    })
    .then(info => {
    	res.render('pages/home',{
				my_title: "Home Page",
				data: info[0], // Return the color options
				color: color_choice, // Return the color choice
				color_msg: info[1][0].color_msg// Return the color message
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/home', {
                my_title: 'Home Page',
                data: '',
                color: '',
                color_msg: ''
            })
    });

});

//older app.get below
app.get('/home', function(req, res) {
	var query = 'select * from favorite_colors;';
	db.any(query)
        .then(function (rows) {
            res.render('pages/home',{
				my_title: "Home Page",
				data: rows,
				color: '',
				color_msg: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/home', {
                my_title: 'Home Page',
                data: '',
                color: '',
                color_msg: ''
            })
        })
});

app.post('/home/pick_color', function(req, res) {
	var color_hex = req.body.color_hex;
	var color_name = req.body.color_name;
	var color_message = req.body.color_message;
	var insert_statement = 'INSERT INTO favorite_colors(hex_value, name, color_msg) VALUES(\''+color_hex+'\', \''+color_name+'\', \''+color_message+'\');'; // Write a SQL statement to insert a color into the favorite_colors table
	var color_select = 'select * from favorite_colors;';// Write a SQL statement to retrieve all of the colors in the favorite_colors table
	//console.log(insert_statement);
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
            task.any(color_select)
        ]);
    })
    .then(info => {
    	res.render('pages/home',{
				my_title: "Home Page",
				data: info[1],// Return the color choices
				color: color_hex, // Return the hex value of the color added to the table
				color_msg: color_message// Return the color message of the color added to the table
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/home', {
                my_title: 'Home Page',
                data: '',
                color: '',
                color_msg: ''
            })
    });
});

//older code below
// app.post('/home', function(req, res) {
// 	var get_variable = req.body.parameter_name;
// 	res.render('pages/home',{
// 		text_variable:"",
// 		number_variable: 5,
// 		parameter_variable: get_variable
// 	});
// });


// Team Stats Page:
// /team_stats - get request (no parameters)
// 	This route will require no parameters.  It will require 3 postgres queries which will:
// 		1. Retrieve all of the football games in the Fall 2020 Season
// 		2. Count the number of winning games in the Fall 2020 Season
// 		3. Count the number of lossing games in the Fall 2020 Season
// 	The three query results will then be passed on to the team_stats view (pages/team_stats).
// 	The team_stats view will display all fo the football games for the season, show who won each game,
// 	and show the total number of wins/losses for the season.

app.get('/team_stats', function(req, res) {
	var fb_games = 'select * from football_games;';
	var wins = 'select count(*) from football_games where home_score > visitor_score;';
	var losses = 'select count(*) from football_games where home_score < visitor_score;';
	db.task('get-everything', task => {
		return task.batch([
			task.any(fb_games),
			task.any(wins),
			task.any(losses)
			
		]);
	})
	.then(data => {
		res.render('pages/team_stats',{
				my_title: "Team Stats",
				fb_games: data[0],
				wins: data[1],
				losses: data[2]
			})
	})
	.catch(err => {
		// display error message in case an error
			console.log('error', err);
			res.render('pages/team_stats',{
				my_title: "Page Title Here",
				fb_games: '',
				wins: '',
				losses: ''
			})
	});

});

app.listen(3000);
console.log('3000 is the magic port');
