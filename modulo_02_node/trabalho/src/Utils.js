import { promises as fs } from "fs";
import path from "path";

const __dirname = path.resolve();

class Utils {
    readFile(fileName, folderPath){
        return fs.readFile(path.resolve(__dirname, folderPath, fileName), "utf8");    
    }

    writeFile(fileName, folderPath, jsonData){
        return fs.writeFile(
            path.resolve(__dirname, folderPath, fileName),
            JSON.stringify(jsonData) 
        );
    }
}

export default Utils;