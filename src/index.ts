import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import session from 'express-session';
import * as exphbs from 'express-handlebars';
import 'reflect-metadata';
import { initPassport } from './configs/passport.config';
import Database from './configs/database.config';
import flash from 'connect-flash';

import authRoute from './app/auth/auth.route';

const PORT: number = Number(process.env.PORT) || 5000;
const app: Application = express();
const viewInstance = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });

// handlebars
app.engine('.hbs', viewInstance.engine);
app.set('view engine', '.hbs');

// session
app.use(session({
    secret: process.env.SECRET_SESSION || 'secret_123',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

Database.connect();
initPassport(app);

app.use('/', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})
