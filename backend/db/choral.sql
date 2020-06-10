DROP DATABASE IF EXISTS choral;

CREATE DATABASE choral;

\c choral

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    avatar VARCHAR,
    location VARCHAR,
    instrument VARCHAR,
    fav_genre VARCHAR,
    anthem VARCHAR
);

CREATE TABLE reefs  (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id),
    reef_name VARCHAR,
    genre VARCHAR,
    bpm INT,
    reef_key VARCHAR,
    chord_progression VARCHAR,
    looking_for VARCHAR,
    audio VARCHAR,
    art VARCHAR,
    reef_closed BOOLEAN,
    volume INT,
    stereo_position INT,
    is_deleted BOOLEAN
);

CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    collaborator_id INT REFERENCES users(id),
    reef_id INT REFERENCES reefs(id),
    reef_owner_id INT REFERENCES users(id),
    audio VARCHAR,
    instrument_name VARCHAR,
    approved BOOLEAN,
    volume INT,
    stereo_position INT,
    is_deleted BOOLEAN
);

CREATE TABLE follows (
    user_id INT REFERENCES users(id),
    followed_id INT REFERENCES users(id),
    active_status BOOLEAN
);


INSERT INTO users (username, email, password, avatar, location, instrument, fav_genre, anthem)
    VALUES ('Pete', 'peterfiorentino@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/12308322_1064602090219673_346612030046945553_n.jpg?_nc_cat=104&_nc_sid=7aed08&_nc_oc=AQkzMYvgIgDfwwRP8vBwuO3FZN8qYvOeEvmQ_g6shz6Hpl7TD5obfRj3NZNWeLEp3pvyB5ormv0O6YgXC1ZxAksy&_nc_ht=scontent-lga3-1.xx&oh=1a8fb40d1e7f20fbda210c9af6113dd0&oe=5F01E35B', 'Staten Island, NY', 'Piano', 'Hip-Hop', 'I Want You Back by The Jackson 5'),
           ('Sergio', 'sergiocohensalama@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/13909295_10209265229484283_8661418597510466381_o.jpg?_nc_cat=110&_nc_sid=e007fa&_nc_ohc=V2IX486EhwkAX9k5NGJ&_nc_ht=scontent-lga3-1.xx&oh=8e10bb9f9d828aaf9ae8b58beb9d6b4f&oe=5EE605E0','Philadelphia, PA', 'Guitar', 'Rock', 'Sailors Tale by King Crimson'),
           ('Owen', 'owenjones@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/68545479_3598552950170956_2369962734889467904_n.jpg?_nc_cat=104&_nc_sid=13bebb&_nc_ohc=3Rpomf8HFrQAX_utV5F&_nc_ht=scontent-lga3-1.xx&oh=26a085edc15ae0d711cda1a044510f8d&oe=5EE50B60', 'Brooklyn, NY', 'Bass', 'Acid Jazz', 'Coronus the Terminator by Flying Lotus');


INSERT INTO reefs  (owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position, is_deleted)
    VALUES (1, 'Instrumental Groove', 'reggae', 74, 'C minor', 'C-C-Ab-Bb', 'all instruments', 'http://localhost:3001/audios/drums.mp3', 'http://localhost:3001/images/coral.jpeg', false, 80, 50, false),
           (2, '3/4 Rocker', 'rock', 120, 'E major', 'A-G-E', 'beat and bass', 'http://localhost:3001/audios/guit.mp3', 'http://localhost:3001/images/coral.jpeg', false, 80, 50, false);
           

INSERT INTO collaborations (collaborator_id, reef_id, reef_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted)
    VALUES (1, 1, 1, 'http://localhost:3001/audios/bassguitar.mp3', 'bass', false, 80, 50, false),
           (2, 1, 1, 'http://localhost:3001/audios/leadguitar.mp3', 'guitar', false, 80, 50, false),
           (3, 1, 1, 'http://localhost:3001/audios/horns.mp3', 'horns', false, 80, 50, false),
           (1, 2, 2, 'http://localhost:3001/audios/beat.mp3', 'beat', false, 80, 50, false);


INSERT INTO follows (user_id, followed_id, active_status)
    VALUES(1,2, true),
          (1,3, true),
          (1,1, true),
          (2,1, true),
          (2,2, true),
          (3,3, true),
          (2,3, true),
          (3,1, true),
          (3,2, true);