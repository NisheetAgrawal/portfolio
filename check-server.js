const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/index-fixed.html',
  method: 'HEAD'
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Server is running and the file is accessible');
  process.exit(0);
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.end(); 