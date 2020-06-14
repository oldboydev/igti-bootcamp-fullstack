class Grade{ 
    private id: string;
    private student: string;
    private subject: string;
    private type: string;
    private value: string;
    private timestamp: Date;
  
    constructor(
        id: string,
        student: string,
        subject: string,
        type: string,
        value: string,
        timestamp: Date
    ){
        this.id = id;
        this.student = student;
        this.subject = subject;
        this.type = type;
        this.value = value;
        this.timestamp = timestamp;
    }

    getId(): string{
        return this.id;
    }

    getStudent(): string{
        return this.student;
    }

    getSubject(): string{
        return this.subject;
    }

    getType(): string{
        return this.type;
    }

    getValue(): string{
        return this.value;
    }

    getTimestamp(): Date{
        return this.timestamp;
    }

    setId(id: string){
        this.id = id;
    }

    setStudent(student: string){
        this.student = student;
    }
    
    setSubject(subject: string){
        this.subject = subject;
    }
    
    setType(type: string){
        this.type = type;
    }
    
    setValue(value: string){
        this.value = value;
    }
    
    setTimestamp(timestamp: Date){
        this.timestamp = timestamp;
    }
}

export default Grade;