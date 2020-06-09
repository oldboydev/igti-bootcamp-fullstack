const express = require("express");
const fs = require("fs");
const winston = require("winston");
const app = express();
const accountsRouter = require("./routes/accounts");

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "bank-api.log"})
    ],
    format: combine(
        label({ label: "bank-api" }),
        timestamp(),
        myFormat
    )
});

app.use(express.json());
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
    res.send("API BANK ROOT");
});

app.listen("3333", () => {
    console.time("APP");
    logger.info("API started");    
    
    fs.readFile("accounts.json", "utf8", (err, data) => {
        if(err){
            let jsonRoot = { nextId: 1, accounts: []};

            fs.writeFile("accounts.json", JSON.stringify(jsonRoot), (err) => {
                if(err){
                    logger.error(err);
                }                
            });
        }
    });
});