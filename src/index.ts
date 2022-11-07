
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import sql from "mssql";
import { Shift } from "./shift";
import { CalcUtils } from "./calcUtils";

dotenv.config();

const app: Express = express();
const testString: string = "loser";

app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get('/', (_req: Request, res: Response) => {
    console.log("WE GOT ACTION BABY");
    res.send(`HELLO THERE ${testString}`);
});

app.post('/test-post', async (req: Request, res: Response) => {
    const shift: Shift = req.body.shift;
    console.log(shift);
    // const calcUtils: CalcUtils = req.body.calcUtils;

    const sqlConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        server: "localhost",
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
        //   encrypt: true, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    };
    
    try {
        sql.connect(sqlConfig, (error?: Error) => {
            if (error) {
                console.log("HERE IS AN ERROR: " + error);
                res.send({ "error": error });
            };

            const request = new sql.Request();

            request
                .input("miles_driven", sql.Decimal, shift.milesDriven)
                .input("start_time", sql.DateTime, shift.startTime)
                .input("end_time", sql.DateTime, shift.endTime)
                .input("income", sql.Decimal, shift.income)
                .query(`
                    INSERT INTO Shifts (Miles, StartTime, EndTime, Income)
                    VALUES (@miles_driven, @start_time, @end_time, @income);
                    `, (error, recordset) => {
                        if (error) console.log(error);

                        res.send(recordset)
                    });
        });
    } catch (e: unknown) {
        console.log((e as Error).message);
    };
});

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNIG ON PORT ${process.env.PORT}`)
});