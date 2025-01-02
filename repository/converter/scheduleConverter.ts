import { Schedule } from '../../models/schedule';
import { User } from '../../models/User';

export const convertSchedule = (scheduleData: any) => {
    const participants = scheduleData.participants.map((data: any) => User.fromScheduleRepostioryData(data))
    return Schedule.fromRepostioryData(scheduleData.title, scheduleData.startDatetime, scheduleData.endDatetime, scheduleData.id, participants);
}