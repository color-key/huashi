const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'public/face/'+1234);

fs.mkdirSync(basePath);