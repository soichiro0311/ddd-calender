import { ParticipationStatus } from "../../models/ParticipationStatus";
import { DomainError } from "../../error/domainError";
import { Participant } from "../../models/Participant";

export class ParticipantDto {
  userId: string;
  userName: string;
  participationStatus: ParticipationStatus;

  constructor(model: Participant) {
    this.userId = model.userId();
    this.userName = model.userName();
    this.participationStatus = model.status();
  }
}
