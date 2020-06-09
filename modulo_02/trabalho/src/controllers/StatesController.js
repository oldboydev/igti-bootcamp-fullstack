import Utils from "./../Utils.js";

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
            const countCities = await getCitiesNumByState(uf.toUpperCase());

            return res.json({ state: uf, numberOfCities: countCities});
        } catch(error){
            console.error(error)
            return res.status(400).json({ msg: "invalid uf parameter! Can't find the state with uf: " + uf});
        }        
    }

    async getCitiesNumByState(state){
        console.log(state);
        const fileName = state + ".json";        
        const cities = await this.utils.readFile(fileName, this.folderPath);

        return cities.length;
    }
}

export default StatesController;