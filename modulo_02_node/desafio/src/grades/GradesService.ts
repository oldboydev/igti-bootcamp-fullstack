import Grade from "./Grade";
import GradesJsonRepository from "../repositories/GradesJsonRepository";
import JsonDataSource from "../datasources/JsonDataSource";

class GradesService{
    gradeRepository: GradesJsonRepository;

    constructor(){
        this.gradeRepository =  new GradesJsonRepository(new JsonDataSource("grades.json", "files"));
    }

    async createGrade(data: any){
        const id = "";
        const timeStamp = new Date();

        const grade: Grade = new Grade(
           id,
           data.student,
           data.subject,
           data.type,
           data.value,
           timeStamp
        );

        return await this.gradeRepository.save(grade);
    }

    async updateGrade(id: string, data: any){
        const timeStamp = new Date();

        const grade: Grade = new Grade(
           id,
           data.student,
           data.subject,
           data.type,
           data.value,
           timeStamp
        );

        return await this.gradeRepository.update(grade);
    }

    async deleteGrade(id: string){
        return await this.gradeRepository.delete(id);
    }

    async getGrade(id: string){
        return await this.gradeRepository.getByID(id);
    }

    async getTotalValueByType(student: string, subject: string){
        const jsonData = await this.gradeRepository.getAll();
        const grades = jsonData.grades;

        const totalGrade = grades.reduce((accumulator: number, grade: any) => {
            if(
                grade.student.toLowerCase() == student.toLowerCase() &&
                grade.subject.toLowerCase() == subject.toLowerCase()
            ){
                return accumulator + Number.parseInt(grade.value);
            }else{
                return accumulator;
            }
        }, 0);

        return totalGrade;
    }

    async getAverage(subject: string, type: string){
        const jsonData = await this.gradeRepository.getAll();
        const grades = jsonData.grades;

        const filterGrades = grades.filter((grade: any) => {
            if(
                grade.subject.toLowerCase() == subject.toLowerCase() &&
                grade.type.toLowerCase() == type.toLowerCase()
            ){
                return grade;
            }
        });

        const totalGrade = filterGrades.reduce((accumulator: number, grade: any) => {
            return accumulator + Number.parseInt(grade.value);
        }, 0);

        const result = totalGrade / filterGrades.length

        return result.toFixed(2);
    }

    async getTop(subject: string, type: string, top: string){
        const jsonData = await this.gradeRepository.getAll();
        const grades = jsonData.grades;

        const filterGrades = grades.filter((grade: any) => {
            if(
                grade.subject.toLowerCase() == subject.toLowerCase() &&
                grade.type.toLowerCase() == type.toLowerCase()
            ){
                return grade;
            }
        });
        
        const orderGrades = filterGrades.sort( (a, b) => a.value < b.value ? 1 : -1);

        const result = orderGrades.slice(0, top);

        return result;
    }
}

export default GradesService;