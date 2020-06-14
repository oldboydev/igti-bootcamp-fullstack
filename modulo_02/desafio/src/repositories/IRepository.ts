interface IRepository{
    getByID(id: any): any;
    getAll(): any;
    save(data: any): any;
    update(data: any): any;
    delete(id: any): any;
}