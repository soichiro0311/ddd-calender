import { Schedule } from "../../models/schedule";
import { Participant } from "../../models/Participant";

export const convertSchedule = (scheduleData: any) => {
  const participants = scheduleData.participants.map(
    (data: any) =>
      Participant.fromScheduleRepositoryData(data)
  );
  return Schedule.fromRepostioryData(
    scheduleData.title,
    scheduleData.startDatetime,
    scheduleData.endDatetime,
    scheduleData.id,
    participants
  );
};
