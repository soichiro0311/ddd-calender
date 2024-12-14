import { Schedule } from '../../models/schedule';
export const convertSchedule = (scheduleData: any) => {
    return new Schedule(scheduleData.title, scheduleData.startDatetime, scheduleData.endDatetime);
}