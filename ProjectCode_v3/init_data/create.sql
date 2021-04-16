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
VALUES('Abeal Sileshi', 'abealsileshi', '2020', 'CS', 4.00, 'senior' , 'he/him/his', 'I have some experience.', 'communication skills', 'boulder'),
('Allison Liu', 'allisonliu', '2020', 'CS&MATH', 4.00, 'junior' , 'she/her', 'I did an internship.', 'public speaking skills', 'chicago'),
('Brady Murphy', 'bradymurphy', '2020', 'CS', 4.00, 'junior' , 'he/him', 'I have worked many jobs', 'organizational skills', 'newyork'),
('Isaiah Thomas', 'isaiahthomas', '2020', 'CS', 4.00, 'junior' , 'he/him', 'I have worked many jobs', 'computer skills', 'houston');

DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS posts(
  post_text VARCHAR(500) NOT NULL,
  post_id SERIAL NOT NULL,
  username_posts VARCHAR(30) REFERENCES user_table (username),

  PRIMARY KEY(post_id) 
);

INSERT INTO posts(post_text, username_posts)
VALUES('Hello, everyone I am on the job market please reach out to me', 'abealsileshi' ),
('I know 2 people giving out internships, message me guys!', 'allisonliu'),
('If you guys would like to learn about web development sign up for CSCI 3308!', 'bradymurphy'),
('I just intervied at Google, my biggest tip is to practice doing leetcode beforehand', 'isaiahthomas');

