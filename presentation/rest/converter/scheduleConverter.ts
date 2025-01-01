import { CreateScheduleRequest } from "../../../usecases/dto/createScheduleRequest";

export const convertSchedule = (requestJson: any) => {
    return new CreateScheduleRequest(requestJson);
}