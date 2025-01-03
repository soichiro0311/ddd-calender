import "reflect-metadata";
import { ScheduleRepository } from "../usecases/interface/scheduleRepository";
import { Schedule } from "../models/schedule";
import { injectable } from "../../node_modules/inversify/lib/cjs/annotation/injectable";
import { Participant } from "../models/Participant";

@injectable()
export class ScheduleRepositoryMock
  implements ScheduleRepository
{
  private dataStore: Array<Schedule> = [];

  async save(schedule: Schedule) {
    this.dataStore.push(schedule);
  }

  async list(): Promise<Schedule[]> {
    return this.dataStore;
  }

  updateParticipationStatus(
    participant: Participant
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve(
        this.dataStore.forEach((schedule) => {
          schedule
            .participants()
            .forEach((scheduledParticipant) => {
              if (
                scheduledParticipant.userId() ===
                participant.userId()
              ) {
                participant.respondToSchedule(
                  participant.status()
                );
              }
            });
        })
      );
    });
  }

  clear(): void {
    this.dataStore = [];
  }
}
