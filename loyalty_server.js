console.log('Server-side code running');
const express = require('express');
const app = express();

// serve files from the public directory
app.use(express.static('public'));



//connect to snowflake and load data
var snowflake = require('snowflake-sdk');
var connection = snowflake.createConnection( {
    account: 'VV36374.ap-south-1.aws',
    username: 'nttham',
    password: 'Spaniac@1'
    }
    );

//confirm connection is working
connection.connect(
        function(err, conn) {
            if (err) {
                console.error('Unable to connect: ' + err.message);
                }
            else {
                console.log('Successfully connected to Snowflake.');
                // Optional: store the connection ID.
                connection_ID = conn.getId();
                }
            }
        );


// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/countClicks.html');
});

