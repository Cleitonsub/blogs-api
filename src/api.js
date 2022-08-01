const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const errorHandlerMiddleware = require('./middlewares/error.middleware');

const app = express();
require('express-async-errors');

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/login', authRouter);
app.use('/user', userRouter);

app.use(errorHandlerMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
