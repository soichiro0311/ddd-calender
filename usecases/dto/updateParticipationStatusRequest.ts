import { ParticipationStatus } from "../../models/ParticipationStatus";

export class UpdateParticipationStatusRequest {
  private _scheduleId: string;
  private _userId: string;
  private _participantsStatus: ParticipationStatus;

  constructor(requestJson: any) {
    this._scheduleId = requestJson.body.scheduleId;
    this._userId = requestJson.body.userId;
    this._participantsStatus =
      requestJson.body.participantsStatus;
  }

  userId(): string {
    return this._userId;
  }

  scheduleId(): string {
    return this._scheduleId;
  }

  updatedStatus(): ParticipationStatus {
    return this._participantsStatus;
  }
}
