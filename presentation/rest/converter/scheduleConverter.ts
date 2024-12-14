import { Request } from "express";
import { Schedule } from "../../../models/schedule";

export const convertSchedule = (requestJson: any) => {
    const title = requestJson.body.title
    const startDatetime = requestJson.body.startDatetime
    const endDatetime = requestJson.body.endDatetime
    const shcdule = new Schedule(title, startDatetime, endDatetime);
    return shcdule;
}