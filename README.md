# Choral

A remote musical playground. 
Choral is a full-stack web solution for remote music collaboration.

- A user can upload a sound or song, from now on "reef", either from a preexistent file or by recording it live with the app. The user can include some specifics about the sound (musical key, genre, tempo, progression) and must complete a "looking for" field for letting other users know how to collaborate.
- A user can find other user's reefs by: going to their profile page; by scrolling through the "Explore" feed (all reefs) or "My Feed" (reefs from users the user follows); by looking at the Collaborators page which has a list of all other users that have collaborated with the user in the past. 
- A user can see the picture and info (homebase, anthem, fav genre) from a particular user, decide to follow or to unfollow, and preview the reefs from that user.
- A user can see the picture and info (genre, bpm, key, chord progression) of a reef. 
- A user can collaborate with a reef by uploading a sound, either from a preexistent file or by recording it live with the app. If the choice is the latter, the collaboration may be recorded from any point of the song and that time reference will be kept for when the creator of the reef listens to it.
- A user can mix the original track of a reef with the merged collaborations by individually muting or changing volume and panning.
- A user can play a reef with its merged tracks, pause at any point to resume from there or stop to go back to the beginning.
- A user that owns a reef can listen to new collaborations made to that reef and decide to merge them or discard them
- A user that owns a reef can change his mind and unmerge a previously merged collaboration.
- A user that owns a reef can save particular mix settings and the merged or unmerged state of the collaborations made to it.
- A user that owns a reef can bounce an audio file out it, which is a live recording of the sound that's coming out of Choral.

## Database Structure

Choral uses PostgreSQL for the database. 

- **users**
  - id
  - username - _Unique_
  - email - _Unique_
  - password
  - avatar
  - location
  - instrument
  - fav_genre
  - anthem

- **reefs**
  - id
  - owner_id - _References Users_
  - reef_name
  - genre
  - bpm
  - reef_key
  - chord_progression
  - looking_for
  - audio
  - art
  - reef_closed
  - volume
  - stereo_position
  - is_deleted

- **collaborations**
  - id
  - collaborator_id - _References Users_
  - reef_id - _References Reefs_
  - reef_owner_id - _References Users_
  - audio
  - instrument_name
  - approved
  - volume
  - stereo_position
  - is_deleted
  - starting_point
  
- **follows** 
  - user_id - _References Users_
  - followed_id - _References Users_
  - active_status
  
## API Endpoints

- **Users**

  | Method | Endpoint          | Description           | Properties sent in JSON body |
  | ------ | ----------------- | --------------------- | ---------------------------- |
  | GET    | `/users`          | Get all users         | n/a                          |
  | GET    | `/users/:id`      | Get single user by id | n/a                          |
  | PATCH  | `/users/:id`      | Update user's pic     | `avatar`                     |
  | PATCH  | `/users/info/:id` | Update user's info    | `username`, `email`, `location`, `instrument`, `fav_genre`, `anthem` |

- **Reefs**

  | Method | Endpoint                    | Description                           | Properties sent in JSON body         |
  | ------ | --------------------------- | ------------------------------------- | ------------------------------------ |
  | GET    | `/reefs`                    | Get all reefs                         | n/a                                  |
  | GET    | `/reefs/localfeed/:user_id` | Get reefs from users a user follows   | n/a                                  |
  | GET    | `/reefs/:id`                | Get single reef by id                 | n/a                                  |
  | GET    | `/reefs/user/:user_id`      | Get all reefs from a user             | n/a                                  |
  | POST   | `/reefs`                    | Create new reef                       | `owner_id`, `reef_name`, `genre`, `bpm`, `reef_key`, `chord_progression`,  `looking_for`, `audio`, `art`, `reef_closed`, `volume`, `stereo_position` |
  | PATCH  | `/reefs/:id`                | Update a reef's mix settings          | `volume`, `stereo_position`          |
  | PATCH  | `/reefs/delete/:id`         | Mark a single reef as deleted         | `is_deleted`                         |
  
- **Collaborations**
  
  | Method | Endpoint                    | Description                           | Properties sent in JSON body         |
  | ------ | ----------------------------------------| ------------------------------------- | ------------------------------------ |
  | GET    | `/collaborations/:reef_id`              | Get all collabs for a specific reef   | n/a                      |
  | GET    | `/collaborations/collaborators/user_id` | Get all collaborators for a user id   | n/a                      |
  | POST   | `/collaborations`                       | Add new collab                        | `collaborator_id`, `reef_id`, `reef_owner_id`, `audio`, `instrument_name`, `approved`, `volume`, `stereo_position`, `is_deleted`, `starting_point` |
  | PATCH  | `/collaborations/:collab_id`            | Update a collab's settings            | `approved`, `volume`, `stereo_position` |
  | PATCH  | `/collaborations/clear_pool/:reef_id`   | Delete all unmerged collabs to a reef | n/a                      |
  | PATCH  | `/collaborations/delete/:id`            | Mark a single collab as deleted       | n/a                      |

- **Following**

  | Method | Endpoint                          | Description                         | Properties sent in JSON body.    |
  | ------ | --------------------------------  | ----------------------------------- | -------------------------------- |
  | GET    | `/:user_id/follows/:followed_id`  | Get if a user is following another  | n/a                              |
  | POST   | `/:user_id/follows/:followed_id`  | Make a user start following another | n/a                              |
  | PATCH  | `/:user_id/unfollow/:followed_id` | Make a user stop following another  | n/a                              |
  | PATCH  | `/:user_id/refollow/:followd_id`  | Make a user refollow another        | n/a                              |

## Frontend

Choral uses React for the front end. HowlerJS and the Web Audio API are utilized for the audio processing, Media Player API for recording, and some Bootstrap and Material UI for advanced styling.

### Routes
| Route         | Feature                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------|
| `/landing`    | Home route. Shows app logo. User can login or sign up. |
| `/feed`       | Shows the "Explore" feed with all the reefs existing in Choral. User switch change to "My Feed" to only see reefs from users the user follows. |
| `/profile/:id`| Profile Page. Shows all the reefs the user uploaded with its artwork and merged and unmerged collaborations. Shows user's avatar and info. User can toggle info in and out and preview 45 seconds of each reef's original sound. If visiting own profile, user can change info and pic. |
| `/add`        | Shows reef upload input fields, two file selectors and a submit button. User can complete just the required fields of "name" and "looking for" or add more information. User has to pick a sound and an image for the new reef. User can click submit, be redirected to user's own profile and see the new reef. |
| `/reef`       | Reef page. Shows the artwork, the info, the collaboration options, the merged tracks and their options, and a progress bar with player controls. If user's visiting own reef, shows unmerged tracks and their options. User can toggle info in an out; collaborate by recording live or by using a preexistent file, then upload that collaboration; mix or mute merged tracks, change panning and volume while reef plays; press play to hear merged tracks in sync with original sound and scroll through the reef by clicking the progress bar, press pause in any desired point or press stop to go back to the beginning of the sounds. If visiting own reef, user can merge or unmerge tracks, clear pool of unmerged collaborations, save mix settings with approved states and bounce the sound of the app to a file. |
| `/collaborators` | Shows the pictures and names of collaborators that have at least one merged track in a user's reef. User can click on names to go to profiles. |
