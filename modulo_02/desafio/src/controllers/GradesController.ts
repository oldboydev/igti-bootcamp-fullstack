import GradesService from "../grades/GradesService";
import {Request, Response} from 'express';

class GradesController{
    gradGradesService: GradesService;

    constructor(){
        this.gradGradesService = new GradesService();
    }

    async create(req: Request, res: Response){
        const reqData = req.body;
        
        try{
            const result = await this.gradGradesService.createGrade(reqData);

            return res.json({ msg: "Grade inserida com sucesso" });
        } catch(error){
            const msg = "Ocorreu um erro ao criar um novo grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }
    }

    async update(req: Request, res: Response){
        const { id } = req.params;
        const reqData = req.body;
        
        try{
            const result = await this.gradGradesService.updateGrade(id, reqData);

            return res.json({ msg: "Grade atualizada com sucesso" });
        } catch(error){
            const msg = "Ocorreu um erro ao atualizar grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params;
        
        try{
            const result = await this.gradGradesService.deleteGrade(id);

            return res.json({ msg: "Grade excluida com sucesso" });
        } catch(error){
            const msg = "Ocorreu um erro ao excluir a grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }
    }

    async show(req: Request, res: Response){
        const { id } = req.params;
    
        try{
            const result = await this.gradGradesService.getGrade(id);

            return res.json({ result });
        } catch(error){
            const msg = "Ocorreu um erro ao obter a grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }     
    }

    async showTotalGrade(req: Request, res: Response){
        const { student, subject } = req.query;
        
        try{
            const result = await this.gradGradesService.getTotalValueByType(student, subject);

            return res.json({ result });
        } catch(error){
            const msg = "Ocorreu um erro ao obter a grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }      
    }

    async showAverage(req: Request, res: Response){
        const { subject, type } = req.query;
        console.log(req.query);
        try{
            const result = await this.gradGradesService.getAverage(subject, type);

            return res.json({ result });
        } catch(error){
            const msg = "Ocorreu um erro ao obter a grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }      
    }

    async showTop(req: Request, res: Response){
        const { subject, type, top } = req.query;
        console.log(req.query);
        try{
            const result = await this.gradGradesService.getTop(subject, type, top);

            return res.json({ result });
        } catch(error){
            const msg = "Ocorreu um erro ao obter a grade";
            console.log(msg, error);

            return res.status(400).json({ msg: msg, error: error });
        }      
    }
    
}

export default GradesController;