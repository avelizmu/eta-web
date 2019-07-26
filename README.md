# eta-web
React website to get real-time ETA updates from someone using the ETA app.

The website is initialized with a firebase configuration from which it takes all its data.

The path /id will display the estimated time and distance between the app user's current distance and their set destination that was saved in the database with that id

### Install Instructions
* `git clone https://github.com/aveliz1999/eta-web`
* `cd eta-web`
* `npm install`
* Rename or copy `config.json.example` to `config.json` and fill in your firebase information
* `npm start`

    The website will be available at http://127.0.0.1:3000 or optionally with a port specified in the PORT environment variable
