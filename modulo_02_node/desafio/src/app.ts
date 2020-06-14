import express from "express";

import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, initAPI);

async function initAPI(){
    console.log("API is on!");
}