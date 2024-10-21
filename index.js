// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const inputDate = req.params.date;
  let date;

  // Check if the input date is empty
  if (!inputDate) {
      // Use current time if the date parameter is empty
      date = new Date();
  } else if (!isNaN(inputDate)) {
      // Check if the input is a number (Unix timestamp)
      date = new Date(parseInt(inputDate)); // Convert to number
  } else {
      // Create a date object from the input (string)
      date = new Date(inputDate);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
          return res.status(400).json({ error: "Invalid Date" });
      }
  }

  const response = {
      unix: date.getTime(), // Unix timestamp in milliseconds
      utc: date.toUTCString() // UTC string representation
  };

  res.json(response);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
