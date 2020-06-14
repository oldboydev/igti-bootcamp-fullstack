import { promises as fs } from "fs";
import path from "path";

import IDataSource from "../datasources/IDataSource";
import JsonDataSource from "../datasources/JsonDataSource";
import Grade from "../grades/Grade";
import { json } from "express";
import GradesService from "../grades/GradesService";

class GradesJsonRepository implements IRepository{
    dataSource: JsonDataSource;
    file: string;

    constructor(dataSource: IDataSource){
        this.dataSource = <JsonDataSource> dataSource;
        this.file = path.resolve(path.resolve(), "src", this.dataSource.filePath, this.dataSource.fileName);
    }

    async getByID(id: string) {
        const jsonData = await this.getAll();
        const grades = jsonData.grades;

        const grade = grades.filter(grade => grade.id == id);  
        
        if(grade.length == 1){
            return grade[0];
        }else{
            throw new Error("Usuario com o id: " + id + " não encontrado!");
        }      
    }
    
    async getAll() {
        const rawData = await fs.readFile(this.file, "utf8");

        return JSON.parse(rawData);
    }

    async save(grade: Grade){
        const jsonData = await this.getAll();
        const nextId = jsonData.nextId;
        const grades = jsonData.grades;

        grades.push( {
            id: nextId,
            student: grade.getStudent(),
            subject: grade.getSubject(),
            type: grade.getType(),
            value: grade.getValue(),
            timestamp: grade.getTimestamp()
        });

        jsonData.nextId++;
        jsonData.grades = grades;

        await fs.writeFile(this.file, JSON.stringify(jsonData));
    }

    async update(grade: Grade){
        const jsonData = await this.getAll();
        const grades = jsonData.grades;
        const index = grades.findIndex(jGrade => jGrade.id == grade.getId());

        if(index > 0){
            grades[index] =  {
                id: grade.getId(),
                student: grade.getStudent(),
                subject: grade.getSubject(),
                type: grade.getType(),
                value: grade.getValue(),
                timestamp: grade.getTimestamp()
            }
    
            jsonData.grades = grades;
    
            await fs.writeFile(this.file, JSON.stringify(jsonData));
        }else{
            throw new Error("Usuario com o id: " + grade.getId() + " não encontrado!");
        }       
    }

    async delete(id: string){
        const jsonData = await this.getAll();
        const grades = jsonData.grades;

        const filterGrades = grades.filter(grade => grade.id != id);

        jsonData.grades = filterGrades;
    
        await fs.writeFile(this.file, JSON.stringify(jsonData));       
    }

}

export default GradesJsonRepository;