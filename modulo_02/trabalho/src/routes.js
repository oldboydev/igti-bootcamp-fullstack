import express from "express";

import StatesController from "./controllers/StatesController.js";

const routes = express.Router();
const statesController = new StatesController("src/files/estados");

routes.get("/states/:uf", statesController.showCountCities.bind(statesController));
routes.get("/states/largest/:top", statesController.showLargestStatesByCitiesNumber.bind(statesController));

export default routes;