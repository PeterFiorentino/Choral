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
    VALUES ('Pete', 'peterfiorentino@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', '../images/pete.jpeg', 'Staten Island, NY', 'Piano', 'Hip-Hop', 'I Want You Back by The Jackson 5'),
           ('Sergio', 'sergiocohensalama@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', '../images/sergio.jpeg','Philadelphia, PA', 'Guitar', 'Rock', 'Sailors Tale by King Crimson'),
           ('Owen', 'owenjones@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', '../images/owen.jpeg', 'Brooklyn, NY', 'Bass', 'Acid Jazz', 'Coronus the Terminator by Flying Lotus');


INSERT INTO reefs  (owner_id, reef_name, genre, bpm, reef_key, chord_progression, looking_for, audio, art, reef_closed, volume, stereo_position, is_deleted)
    VALUES (1, 'Instrumental Groove', 'reggae', 74, 'C minor', 'C-C-Ab-Bb', 'all instruments', '../audios/drums.mp3', '../images/coral.jpeg', false, 80, 50, false),
           (2, '3/4 Rocker', 'rock', 120, 'E major', 'A-G-E', 'beat and bass', '../audios/guit.mp3', '../images/coral.jpeg', false, 80, 50, false);
           

INSERT INTO collaborations (collaborator_id, reef_id, reef_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted, starting_point)
    VALUES (1, 1, 1, 'http://localhost:3001/audios/bassguitar.mp3', 'bass', false, 80, 50, false, 0),
           (2, 1, 1, 'http://localhost:3001/audios/leadguitar.mp3', 'guitar', false, 80, 50, false, 0),
           (3, 1, 1, 'http://localhost:3001/audios/horns.mp3', 'horns', false, 80, 50, false, 0),
           (1, 2, 2, 'http://localhost:3001/audios/beat.mp3', 'beat', false, 80, 50, false, 0);


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
