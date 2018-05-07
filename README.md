# Rankr

Rankr is a full-stack application for collecting and ranking votes. :bar_chart:

Rankr uses the [Borda count](https://en.wikipedia.org/wiki/Borda_count) method to tally and rank votes, and auto-updates the admin page as the votes come in for real-time results.

This app was built using HTML, CSS, JS, and [jQuery](https://jquery.com/)/AJAX on the front-end, and [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and [postgreSQL](https://www.postgresql.org/) on the back-end.

## Final Product

Creating a new poll
!["Create poll"](https://github.com/aunomy/rankr/blob/master/docs/create-poll.gif?raw=true)

Voting in a poll
!["Vote in poll"](https://github.com/aunomy/rankr/blob/master/docs/vote-in-poll.gif?raw=true)

Viewing the results of the poll
!["View results"](https://github.com/aunomy/rankr/blob/master/docs/view-results.gif?raw=true)

## Getting Started

1. Install all dependencies (`npm install`).
2. Configure .env with Mailgun Key, Twilio SID & Token, as well as USER_PHONE, TWILIO_PHONE & USER_EMAIL (or set new values in the server).
3. Start the web server (`npm run local`). The app will be served at <http://localhost:8080/>.
4. Visit <http://localhost:8080/> in your browser.
5. Start ranking!

## Dependencies

```
- body-parser
- dotenv
- EJS
- Express
- Knex
- Knex-logger
- Mailgun
- Morgan
- node-sass-middleware
- PostgreSQL
- Sass
- Sortablejs
- Twilio
- Node.js 5.10.x or above
```
