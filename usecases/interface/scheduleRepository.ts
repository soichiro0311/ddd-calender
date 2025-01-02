import { Schedule } from "../../models/schedule";
import { ParticipationStatus } from '../../models/ParticipationStatus';
import { User } from "../../models/User";

export interface ScheduleRepository {
    save(schedule: Schedule): Promise<void>;
    list(): Promise<Schedule[]>;
    clear(): void
    updateParticipationStatus(scheduleId: string, updatedUser: User): Promise<void>
}