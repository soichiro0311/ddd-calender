import { Schedule } from "../../models/schedule";
import { Participant } from '../../models/Participant';

export interface ScheduleRepository {
    save(schedule: Schedule): Promise<void>;
    list(): Promise<Schedule[]>;
    clear(): void
    updateParticipationStatus(schedule: Participant): Promise<void>
}