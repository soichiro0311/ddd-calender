import { isBefore, format } from "date-fns";
import { DomainError } from "../error/domainError";
import { v4 as uuidv4 } from "../node_modules/uuid/dist/cjs";
import { User } from "./User";
import { Participant } from "./Participant";

export class Schedule {
  private _id: string;
  private _title: string;
  private _startDatetime: Date;
  private _endDatetime: Date;
  private _participants: Participant[];

  private constructor(
    title: string,
    startDatetime: Date,
    endDatetime: Date,
    id: string,
    participants: Participant[]
  ) {
    this.validateScheduleDuration(
      startDatetime,
      endDatetime
    );
    this._id = id;
    this._title = title;
    this._startDatetime = startDatetime;
    this._endDatetime = endDatetime;
    this._participants = participants;
  }

  static new(
    title: string,
    startDatetime: Date,
    endDatetime: Date,
    participantUsers: User[]
  ) {
    const scheduleId = uuidv4();
    const participants = participantUsers.map((user) =>
      Participant.new(scheduleId, user.id(), user.name())
    );
    return new Schedule(
      title,
      startDatetime,
      endDatetime,
      scheduleId,
      participants
    );
  }

  static fromRepostioryData(
    title: string,
    startDatetime: Date,
    endDatetime: Date,
    id: string,
    participants: Participant[]
  ) {
    const result = new Schedule(
      title,
      startDatetime,
      endDatetime,
      id,
      participants
    );
    return new Schedule(
      title,
      startDatetime,
      endDatetime,
      id,
      participants
    );
  }

  title(): string {
    return this._title;
  }

  startDatetime(): string {
    return format(this._startDatetime, "yyyy-MM-dd HH:mm");
  }

  endDatetime(): string {
    return format(this._endDatetime, "yyyy-MM-dd HH:mm");
  }

  id(): string {
    return this._id;
  }

  participants(): Participant[] {
    return this._participants;
  }

  private validateScheduleDuration(
    startDatetime: Date,
    endDatetime: Date
  ) {
    if (!isBefore(startDatetime, endDatetime)) {
      const startDatetimeStr = format(
        startDatetime,
        "yyyy-MM-dd HH:mm"
      );
      const endDatetimeStr = format(
        endDatetime,
        "yyyy-MM-dd HH:mm"
      );
      throw new DomainError(
        "Domain",
        `予定開始日時は予定終了日時より前に設定する必要があります startDatetime: ${startDatetimeStr} endDatetime: ${endDatetimeStr}`
      );
    }
  }
}
