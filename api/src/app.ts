import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import ApiError from './errors/apiError';
import router from './app/routes';
import config from './config';

const app: Application = express();

// Allow both development and production origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    config.clientUrl,
    'https://medi-connect-k.netlify.app'
].filter(Boolean);

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400
};

app.use(cors(corsOptions));

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/favicon.ico', (_req: Request, res: Response) => {
    res.status(204).end();
});

app.get('/', (_req: Request, res: Response) => {
    res.send(config.clientUrl);
});

app.use('/api/v1', router);
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    } else {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Something Went Wrong',
            error: err.message || err || 'Internal Server Error'
        });
    }
    next();
});

export default app;