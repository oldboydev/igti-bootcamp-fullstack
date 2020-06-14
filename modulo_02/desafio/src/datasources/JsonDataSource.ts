import IDataSource from "./IDataSource";

class JsonDataSource implements IDataSource{
    fileName: string;
    filePath: string;

    constructor(fName: string, fPath: string){
        this.fileName = fName;
        this.filePath = fPath;
    }

    getFileName(): string{
        return this.fileName;
    }

    getFilePath(): string{
        return this.filePath;
    }

    setFileName(fName: string){
        this.fileName = fName;
    }

    setFilePath(fPath: string){
        this.filePath = fPath;
    }
}

export default JsonDataSource;