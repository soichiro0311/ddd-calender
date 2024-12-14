import express, { Request, Response } from "express";
import { createSchedule } from '../../usecases/createSchedule';
import { convertSchedule } from "./converter/scheduleConverter";
import { ScheduleRepositoryImplInstance } from "../../repository/ScheduleRepositoryImpl";
import bodyParser from 'body-parser';
import { listSchdule } from '../../usecases/listSchedule';


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.listen(3000, () => {
    console.log('ポート3000番で起動しました。')
})

app.post("/schedule", (request: any, response: any) => {
    const schedule = convertSchedule(request);
    createSchedule(ScheduleRepositoryImplInstance, schedule)
    response.status(200).end()
});

app.get("/schedule", (_: any, response: any) => {
    listSchdule(ScheduleRepositoryImplInstance).then(allSchedules => {
        response.status(200).send(allSchedules)
    })
});
