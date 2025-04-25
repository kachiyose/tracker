const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Tracking route
app.get('/track', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const timestamp = new Date().toISOString();

    console.log(`Tracking hit:
    IP Address: ${ip}
    User Agent: ${userAgent}
    Time: ${timestamp}
    `);

    // Send a 1x1 transparent pixel
    const pixel = Buffer.from(
        "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        'base64'
    );
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': pixel.length
    });
    res.end(pixel);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
