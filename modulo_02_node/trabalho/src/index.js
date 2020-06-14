import express from "express";
import routes from "./routes.js";

import Utils from "./Utils.js";

const app = express();

app.use(express.json());
app.use(routes);

async function initService(){
    const utils = new Utils();
    const readFolder = "src/files/datasource";
    const writeFolder = "src/files/estados";

    try{
        const statesData = await utils.readFile("Estados.json", readFolder);
        const citiesData = await utils.readFile("Cidades.json", readFolder);

        const states = JSON.parse(statesData);
        const cities = JSON.parse(citiesData);
        
        for(let state of states){
            
            const citiesByState = cities.filter(
                city => Number.parseInt(city.Estado, 10) == Number.parseInt(state.ID, 10)
            );
            
            const countCities = citiesByState.length;
            const fileName = state.Sigla + ".json";

            await utils.writeFile(fileName, writeFolder, citiesByState);
            console.log(fileName + " created!");
        };

    } catch(error){
        console.log(error);
    }
}

app.listen("3333", initService);