import express from "express";

import GradesController from "./controllers/GradesController"

const routes = express.Router();
const gradesController = new GradesController();

routes.post("/grades/add", gradesController.create.bind(gradesController));
routes.put("/grades/:id", gradesController.update.bind(gradesController));
routes.delete("/grades/:id", gradesController.delete.bind(gradesController));
routes.get("/grades/:id", gradesController.show.bind(gradesController));
routes.get("/grades/statics/total", gradesController.showTotalGrade.bind(gradesController));
routes.get("/grades/statics/average", gradesController.showAverage.bind(gradesController));
routes.get("/grades/statics/top", gradesController.showTop.bind(gradesController));

export default routes;