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
	var profiles =  'select * from user_table;';
	db.task('get-everything', task => {
        	return task.batch([
            		task.any(profiles),
        	]);
    	})
	.then(info => {
                console.log(info[0]);
	res.render('pages/profile',{
		my_title:"Profile Page",
		data: info[0]
	})
    });
});

//settings page
app.get('/settings', function(req, res) {
	var profiles =  'select * from user_table;';
	db.task('get-everything', task => {
        	return task.batch([
            		task.any(profiles),
        	]);
    	})
	.then(info => {
                console.log(info[0]);
	res.render('pages/settings',{
		my_title:"Settings Page",
		data: info[0]
	})
    });
});

//email index page
app.get('/index', function(req, res) {
	res.render('pages/index',{
		my_title:"Email Page"
	});
});

app.get('/login/login_', function(req, res) {
	
	var userin = req.body.username;
	var passin = req.body.password;
	//var sqluser = 'select username from user_table where username=\''+userin+'\';';
	var sqlcreds = 'select * from user_table where password_=\''+passin+'\' and username=\''+userin+'\';';
	var found = task.any(sqlcreds);
	
	if (found)
	{
	db.task('get-credentials', task => {
        return task.batch([
            task.any(sqlcreds),
        ]);
    })
    
	.then(info => {
    	res.render('pages/home',{
				my_title: "Home Page",
				data: info[0],
			})
    })

    .catch(err => {
            console.log('Unable to find User', err);
            res.render('pages/login', {
                my_title: 'Login Page',
                data: '',
            })
    });
	}

	else
	{
		console.log('Unable to find User', err);
		res.render('pages/login');
	}

});

app.post('/register/add_user',function(req,res){

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
		})
	});

});


app.listen(3000);
console.log('3000 is the magic port');