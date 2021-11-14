import express from 'express';
import bodyParser from "body-parser";
import AppModule from './AppModule';
import RootService from "./services/RootService";

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Rest Services
const rootService: RootService = AppModule.get('RootService');
rootService.configure(app);

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});