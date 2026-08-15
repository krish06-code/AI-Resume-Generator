const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const cors = require('cors');
const interviewRouter = require('./routes/interview.routes');


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

 


app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Global error handler.
// Express 5 automatically forwards rejected promises from async route
// handlers here, so any unhandled error in a controller/service (including
// a Gemini API failure that survives the retry logic in ai.service.js)
// ends up here instead of crashing the process or leaking a raw stack
// trace to the client.
app.use((err, req, res, next) => {
    console.error(err);

    if (err.status === 503 || err.status === 429) {
        return res.status(503).json({
            message: "The AI service is currently experiencing high demand. Please try again in a moment."
        });
    }

    res.status(err.status || 500).json({
        message: err.message || "Something went wrong. Please try again."
    });
});

module.exports = app;