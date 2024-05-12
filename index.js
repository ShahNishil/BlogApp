import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import dataBaseAccess from "./database.js";
import dotenv from "dotenv";
dotenv.config();
 
const db = dataBaseAccess;
  
db.connect((err) => {
    if (err) {
        console.error("Database Connection Error", err);
        throw err;
    }else{
        console.log("Database Connected Successfully");
    }
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(process.env.port, ()=>{
    console.log(`listening on port ${process.env.port}.........`);
});