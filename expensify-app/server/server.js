const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// Heroku assigns the process.env.PORT a port number when it runs the app. If that's not been assigned (e.g. if you're just running locally) then we'll just use 3000
const port = process.env.PORT || 3000;

// app.use() is for setting options for your express server
// we will use it to "register some middleware"
// by middleware we mean: something that will run upon every request to the server
// e.g. if someone makes a request to the server, we might want to run some code that logs something to the screen,
// or serves the asset that was requested from the public folder
// to do that we use express.static() to handle request
// this express.static() call will serve up the assets in the public/ folder - i.e. it will serve up the HTML, JS, and CSS for our app
// then when you run `node server/server.js`, it'll load all these assets to show our app
app.use(express.static(publicPath));

// use * to match with all unmatched routes - i.e. if the thing it's trying to get IS in the public folder then fine, it'll serve that
// else it'll serve the same thing every time
// we're basically forcing it to look in the index.html for all requests that aren't otherwise handled
// so any of our BrowserRouter paths like `create` will be searched for in the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// app.listen() starts up the server on the port you put in the argument
// can also put a callback function like we have here
// Heroku dynamically assigns you a port, so instead of just putting a static value e.g. 3000 in app.listen, do as we've done here
app.listen(port, () => {
    console.log('Server is up');
});