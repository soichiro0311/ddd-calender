import { ParticipationStatus } from "./ParticipationStatus";
export class ScheduleParticipationStatus {
  private _scheduleId: string;
  private _status: ParticipationStatus;

  constructor(
    scheduleId: string,
    status: ParticipationStatus
  ) {
    this._scheduleId = scheduleId;
    this._status = status;
  }

  scheduleId(): string {
    return this._scheduleId;
  }

  participationStatus(): ParticipationStatus {
    return this._status;
  }

  update(updatedStatus: ParticipationStatus): void {
    this._status = updatedStatus;
  }
}
