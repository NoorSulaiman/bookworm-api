# Book Worm

This app is for book lovers, It uses Goodreads API for books search.
Users can add books to there favorites and track the reading progress.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Note: This is the server side of the project, you still need to install the project UI.

### Prerequisites

You need to have node version ^10.12.0 and npm version ^6.4.1 to be able to run this application. Check if you have them already installed and what version you have by running the below code in your terminal.

```
$ node -v
$ npm -v
```

### Installing

1.  Dwonload the zip file or clone it into a directory by using the clone link from this github repo.<br>
2.  cd to the application directory and run
    `$ npm install`
    to install all required node modules.
3.  After installation process run
    `$ npm start`
    in your terminal to start the development server, the server will run on http://localhost:3000/, a Google Chrome page should pupup if not, you can open the local host link in a new tab.
4.  Go to [Book Worm API](https://github.com/NoorSulaiman/book-worm) and follow the intallation steps.

## Built With

* [Express.js] - Node.js library.
* [MongoDB] - Data Base.
* [Mongoose] - Node.js Liberary for MongoDB communications.
* [request-promise] - Fetching data from Goodreads API.
