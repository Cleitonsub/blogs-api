const express = require('express');
const helmet = require('helmet');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/login', authRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
