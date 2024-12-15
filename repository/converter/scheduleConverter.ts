import { Schedule } from '../../models/schedule';
export const convertSchedule = (scheduleData: any) => {
    return Schedule.fromRepostioryData(scheduleData.title, scheduleData.startDatetime, scheduleData.endDatetime, scheduleData.id);
}