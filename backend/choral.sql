DROP DATABASE IF EXISTS choral;

CREATE DATABASE choral;

\c choral

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    avatar VARCHAR
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    session_name VARCHAR,
    genre VARCHAR,
    bpm INT,
    session_key VARCHAR,
    chord_progression VARCHAR,
    looking_for VARCHAR,
    audio VARCHAR,
    session_closed BOOLEAN,
    volume INT
);

CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    session_id INT REFERENCES sessions(id),
    session_owner INT REFERENCES users(id),
    audio VARCHAR,
    comment VARCHAR,
    approved BOOLEAN,
    volume INT
);

INSERT INTO users (username, email, password, avatar)
    VALUES ('Pete', 'peterfiorentino@pursuit.org', 'abc123', 'profilePic.jpeg'),
           ('Sergio', 'sergiocohensalama@pursuit.org', 'abc123', 'profilePic.jpeg'),
           ('Owen', 'owenjones@pursuit.org', 'abc123', 'profile{ic.jpeg');


INSERT INTO sessions (user_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, session_closed)
    VALUES(1, 'BassLineJam', 'hip-hop', 107, 'F# Major', 'F#-A-D-F', 'some kick heavy drums', 'location', false);

INSERT INTO collaborations (session_id, session_owner, audio, comment, approved)
    VALUES(1, 1, 'location', 'The snares are a sample from a Marvin Gaye track', false);

SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM collaborations;