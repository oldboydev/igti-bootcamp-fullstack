import Utils from "./../Utils.js";
import { promises as fs } from "fs";

class StatesController{
    folderPath = null;
    utils = null;

    constructor(folderPath){
        this.folderPath = folderPath;
        this.utils = new Utils();
    }
    
    async showCountCities(req, res){
        const { uf } = req.params;

        if(!uf){
            return res.status(400).json({ msg: "uf parameter is required!"});
        }

        try{
            const countCities = await this.getCitiesNumByState(uf.toUpperCase());

            return res.json({ state: uf, numberOfCities: countCities});
        } catch(error){
            console.error(error)
            return res.status(400).json({ msg: "invalid uf parameter! Can't find the state with uf: " + uf.toUpperCase()});
        }        
    }

    async showLargestStatesByCitiesNumber(req, res){
        const { top } = req.params;        
        const citiesNumberByStates = [];
        
        const statesFiles = await fs.readdir(this.folderPath);

        for(let file of statesFiles){
            const uf = file.split(".")[0];
            const countCities = await this.getCitiesNumByState(uf.toUpperCase());

            citiesNumberByStates.push({ state: uf, numberOfCities: countCities });
        }

        const largestStates = citiesNumberByStates.sort( (a, b) => a.numberOfCities < b.numberOfCities ? 1 : -1);
        const topNLargestStates = largestStates.filter((state, index) => index < top);

        console.log(topNLargestStates);
    }

    async getCitiesNumByState(state){
        const fileName = state + ".json";        
        const cities = await this.utils.readFile(fileName, this.folderPath);

        return JSON.parse(cities).length;
    }
}

export default StatesController;