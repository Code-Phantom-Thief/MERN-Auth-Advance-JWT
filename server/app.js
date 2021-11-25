require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createHttpError = require('http-errors');

const errorHandler = require('./middlewares/ErrorHandler');
const connectDB = require('./config/db');

const authRouter = require('./routes/authRouter');
const protectedRouter = require('./routes/protectedRouter');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

connectDB();

app.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: 'This API is working!!!' });
});

app.use('/api/auth', authRouter);
app.use('/api/protected', protectedRouter);

app.use(errorHandler);
app.use((req, res, next) => {
	next(createHttpError(404));
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		success: false,
		status: error.status || 500,
		message: error.message,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
