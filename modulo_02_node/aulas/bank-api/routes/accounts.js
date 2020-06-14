const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();

router.post("/", async(req, res) => {
    const params = req.body;
    let account;

    try{
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");

        let jsonData = JSON.parse(data);
        account = { id: jsonData.nextId++, ...params}
        jsonData.accounts.push(account);

        fs.writeFile(path.resolve(__dirname, "..", "accounts.json"), JSON.stringify(jsonData), err => {
            if(err){
                console.error(err);

                return  res.status(400).json({ status: "error", msg: "erro on create account" });
            }
        });
    } catch (err) {
        console.error("erro na leitura do arquivo" + err);
        return res.status(400).json({ status: "error", msg: "account created" });
    }

    return res.json({ status: "ok", msg: "account created" });
});

router.get("/", async(req, res) => {
    try{
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");  
        
        return res.json(JSON.parse(data).accounts);
    } catch(err){
        console.error(err);

        return  res.status(400).json({ status: "error", msg: "erro on create account" });
    }
});

router.get("/:id", async(req, res) => {
    let { id } = req.params;
    
    try {
        id = parseInt(id, 10);
    } catch (error) {
        return res.status(400).json({ status: "error", msg: "param id must be a number(int)" });
    }

    try{
        if(!Number.isInteger(id)){
            return res.status(400).json({ status: "error", msg: "param id must be a number(int)" });
        }
        
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");
            
        let accounts = JSON.parse(data).accounts;
        let account = accounts.find(item => item.id == id);

        if(account){
            return res.json(account);
        }else{
            return res.status(400).json({ status: "error", msg: "account not found" });
        }         
    } catch(err){
        console.error(err);

        return  res.status(400).json({ status: "error", msg: "error on read accounts file" });
    }
});

router.delete("/:id", async(req, res) => {
    let { id } = req.params;
    
    try {
        id = parseInt(id, 10);
    } catch (error) {
        return res.status(400).json({ status: "error", msg: "param id must be a number(int)" });
    }

    try{
        if(!Number.isInteger(id)){
            return res.status(400).json({ status: "error", msg: "param id must be a number(int)" });
        }
        
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");
            
        let jsonData = JSON.parse(data);
        let accounts = jsonData.accounts.filter(item => item.id != id);

        jsonData.accounts = accounts;

        fs.writeFile(path.resolve(__dirname, "..", "accounts.json"), JSON.stringify(jsonData), err => {
            if(err){
                console.error(err);

                return  res.status(400).json({ status: "error", msg: "erro on delete account" });
            }
        });

        return res.json({ status: "ok", msg: "account deleted success"});
    } catch(err){
        console.error(err);

        return  res.status(400).json({ status: "error", msg: "error on read accounts file" });
    }
});

router.put("/", async(req, res) => {
    let account = req.body;
    
    try{
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");
        
        let jsonData = JSON.parse(data);
        let index = jsonData.accounts.findIndex(jAccount => jAccount.id == account.id);
        console.log(index);
        if(!index && index < 0){
            return res.status(400).json({ status: "error", msg: "account not found" });
        }

        jsonData.accounts[index] = account;

        const result = await fs.writeFile(path.resolve(__dirname, "..", "accounts.json"), JSON.stringify(jsonData));

        return res.json({ status: "ok", msg: "account update success"});
    } catch(err){
        console.error(err);
        return  res.status(400).json({ status: "error", msg: "error on read accounts file" });
    }
});

router.post("/deposit", async(req, res) => {
    let account = req.body;
    
    try{
        const data = await fs.readFile(path.resolve(__dirname, "..", "accounts.json"), "utf8");
        let jsonData = JSON.parse(data);
        let index = jsonData.accounts.findIndex(jAccount => jAccount.id == account.id);

        if(!index && index < 0){
            return res.status(400).json({ status: "error", msg: "account not found" });
        }

        jsonData.accounts[index].balance += account.balance; 

        await fs.writeFile(path.resolve(__dirname, "..", "accounts.json"), JSON.stringify(jsonData));

        return res.json({ status: "ok", msg: "deposity success", data: jsonData.accounts[index].balance});
    } catch(err){
        console.error(err);
            return  res.status(400).json({ status: "error", msg: "error on read accounts file" });
    }
});


module.exports = router;