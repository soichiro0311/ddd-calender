import { Schedule } from "../../models/schedule";

export interface ScheduleRepository {
    save(schedule: Schedule): Promise<void>;
}