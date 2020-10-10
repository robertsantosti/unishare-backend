import cors from 'cors';
import express from "express";
import routes from "./routes";

const API_URL = 'http://localhost:3333/api/';

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

const app = express();

app.use(cors(options));
app.use(express.json());

app.use("/api", routes);
app.options('*', cors(options));

app.listen("3333");
