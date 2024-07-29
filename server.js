const express = require('express');  
const app = express();  
const cors = require('cors');  
const db = require('./db');

app.use(cors()); // Allow CORS for all origins, modify for production  


db.query('SELECT * FROM OBJECTS', (err, results) => {  
  if (err) {  
    console.error('Error executing query:', err.stack);  
    return;  
  }  
  console.log('Query results:', results);  
});  

// Don't forget to close the connection when done (or use connection pooling)  
db.end();  


app.get('/api/ip', (req, res) => {  
    // Get the client's IP address  
    const clientIp = req.ip || req.connection.remoteAddress;  
    
    // If the server is running behind a proxy, use the X-Forwarded-For header  
    const forwardedIp = req.headers['x-forwarded-for'];  
    
    // Determine the final IP to use  
    const ipAddress = forwardedIp ? forwardedIp.split(',')[0] : clientIp;  

    res.json({ ip: ipAddress });  
}); 
const PORT = process.env.PORT || 8000;  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);  
});