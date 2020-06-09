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

        if(!Number.isInteger(Number.parseInt(top))){
            return res.status(400).json({ msg: "top parameter must be a integer!"});
        }
        
        try{
            const topNLargestStates = await this.getStatesByCitiesNumber(top, "largest");

            return res.json(topNLargestStates);
        } catch(error){
            console.error(error)
            return res.status(400).json({ msg: error});
        }
    }

    async showSmallestStatesByCitiesNumber(req, res){
        const { top } = req.params;        

        if(!Number.isInteger(Number.parseInt(top))){
            return res.status(400).json({ msg: "top parameter must be a integer!"});
        }
        
        try{
            const topNSmallestStates = await this.getStatesByCitiesNumber(top, "small");
            const orderedTopNSmallestStates = topNSmallestStates.sort( (a, b) => a.numberOfCities < b.numberOfCities ? 1 : -1);

            return res.json(orderedTopNSmallestStates);
        } catch(error){
            console.error(error)
            return res.status(400).json({ msg: error});
        }
    }

    async getCitiesNumByState(state){
        const fileName = state + ".json";        
        const cities = await this.utils.readFile(fileName, this.folderPath);

        return JSON.parse(cities).length;
    }

    async getStatesByCitiesNumber(top, order){
        const citiesNumberByStates = [];
        const statesFiles = await fs.readdir(this.folderPath);
        
        for(let file of statesFiles){
            const uf = file.split(".")[0];
            const countCities = await this.getCitiesNumByState(uf.toUpperCase());

            citiesNumberByStates.push({ state: uf, numberOfCities: countCities, label: uf + "-" + countCities });
        }

        let statesCitiesNumber;

        if(order == "largest"){
            statesCitiesNumber = citiesNumberByStates.sort( (a, b) => a.numberOfCities < b.numberOfCities ? 1 : -1);
        }else{
            statesCitiesNumber = citiesNumberByStates.sort( (a, b) => b.numberOfCities < a.numberOfCities ? 1 : -1);
        }

        const topNStates = statesCitiesNumber.filter((state, index) => index < top);

        return topNStates;
    }

    async showCompareCitiesNameSize(req, res){
        const { type } = req.params;

        if(type != "big" && type != "small"){
            return res.status(400).json({ msg: "type parameter must be big or small"});
        }

        try{
            const citiesBigNames = await this.getCitiesSortedByNameSize(type);

            return res.json(citiesBigNames);
        }catch(error){
            console.error(error)
            return res.status(400).json({ msg: error});
        }
    }

    async getCitiesSortedByNameSize(type){
        const citiesBigNames = [];
        const statesFiles = await fs.readdir(this.folderPath);
        
        for(let file of statesFiles){
            const uf = file.split(".")[0];
            const fileName = uf.toUpperCase() + ".json";

            const jsonCities = await this.utils.readFile(fileName, this.folderPath);
            const cities = JSON.parse(jsonCities);
            
            let citiesSorted = [];

            if(type == "big"){
                citiesSorted = cities.sort(
                    (a, b) => a.Nome.length < b.Nome.length ? 1 : -1
                );
            }else {
                citiesSorted = cities.sort(
                    (a, b) => a.Nome.length > b.Nome.length ? 1 : -1
                );
            }
            
            const cityWithBiggestName = citiesSorted[0];
            citiesBigNames.push({ 
                state: uf, 
                city: cityWithBiggestName.Nome, 
                label: cityWithBiggestName.Nome + "-" + uf
            });
        }

        console.log(citiesBigNames);

        return citiesBigNames;
    }
}

export default StatesController;