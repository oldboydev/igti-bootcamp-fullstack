import express from "express";

import StatesController from "./controllers/StatesController.js";

const routes = express.Router();
const statesController = new StatesController("src/files/estados");

routes.get("/states/:uf", (req, res) => statesController.showCountCities(req, res));

export default routes;