DROP TABLE IF EXISTS user_table;

CREATE TABLE IF NOT EXISTS user_table (
  full_name VARCHAR(30),    
  username VARCHAR(30) NOT NULL,  
  password_ VARCHAR(30) NOT NULL,
  major VARCHAR(30),
  gpa DECIMAL,       
  year  VARCHAR(30),
  pronouns VARCHAR(30),
  experience VARCHAR(500),
  skills VARCHAR(500),
  question VARCHAR(200),
  PRIMARY KEY(username) 
);

INSERT INTO user_table(full_name, username, password_, major, gpa, year, pronouns, experience, skills, question)
VALUES('Abeal Sileshi', 'abealsileshi', 'fakepassword', 'CS', 4.00, 'senior' , 'he/him/his', 'I have minimal experience.', 'and no skills', 'boulder'),
('Barack Obama', 'obama', '2020', 'law', 4.00, 'senior' , 'he/him/his', 'I was president.', 'public speaking skills', 'chicago');

DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS posts(
  post_text VARCHAR(500) NOT NULL,
  post_id SERIAL NOT NULL,
  username_posts VARCHAR(30) REFERENCES user_table (username),

  PRIMARY KEY(post_id) 
);

INSERT INTO posts(post_text, username_posts)
VALUES('This is the very first post from anything', 'abealsileshi' ),
('This is the second post we have here', 'obama');

