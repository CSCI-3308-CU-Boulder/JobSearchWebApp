DROP TABLE IF EXISTS profile;
CREATE TABLE IF NOT EXISTS PROFILE (
  full_name VARCHAR(30),       /* Name of the visiting team                     */
  username VARCHAR(30) NOT NULL,   /* Final score of the game for the Buffs         */
  password_ VARCHAR(30) NOT NULL,/* Final score of the game for the visiting team */
  major VARCHAR(30),
  gpa INT,       
  year  VARCHAR(30),
  pronouns  VARCHAR(30),
  PRIMARY KEY(username) /* A game's unique primary key consists of the visitor_name & the game date (this assumes you can't have multiple games against the same team in a single day) */
);

INSERT INTO profile(full_name, username, password_, major, gpa, year, pronouns)
VALUES('Abeal Sileshi', "abealsileshi", "password_", "CS", 4.0, "senior" , "he/him/his");