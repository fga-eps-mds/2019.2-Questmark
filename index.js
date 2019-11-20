const app = require('./backend/config/server');

const port = process.env.PORT || 3000
app.listen(port);
