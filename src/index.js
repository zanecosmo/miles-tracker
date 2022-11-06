"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const testString = "loser";
app.use(body_parser_1.default.json());
app.use("/", express_1.default.static("public"));
app.get('/', (_req, res) => {
    console.log("WE GOT ACTION BABY");
    res.send(`HELLO THERE ${testString}`);
});
app.post('/test-post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = req.body.shift;
    const calcUtils = req.body.calcUtils;
    // try {
    //     const pool = await sql.connect(process.env.CONNECTIONSTRING!);
    //     const result = await pool.request()
    //         .input("miles-driven", sql.Int, shift.milesDriven)
    //         .input("start_time", sql.Int, shift.startTime)
    //         .input("end_time", sql.Int, shift.endTime)
    //         .input("income", sql.Int, shift.income)
    //         .query(`
    //             INSERT INTO Shifts (Miles, startTime, endTime, Income)
    //             VALUES (@miles-driven, @start-time, @end-time, @income);
    //             `);
    //     console.dir(result);
    //     await pool.close();
    // }
    // catch (e: unknown) {
    //     console.log((e as Error).message);
    // };
    res.send(JSON.stringify("you won"));
}));
app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNIG ON PORT ${process.env.PORT}`);
});
