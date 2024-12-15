import { isBefore, format } from "date-fns";
import { DomainError } from "../error/domainError";
import { v4 as uuidv4 } from 'uuid';

export class Schedule {
    private _id: string
    private _title: string;
    private _startDatetime: Date;
    private _endDatetime: Date;

    private constructor(title: string, startDatetime: Date, endDatetime: Date, id: string) {
        this.validateScheduleDuration(startDatetime, endDatetime);
        this._id = id
        this._title = title
        this._startDatetime = startDatetime
        this._endDatetime = endDatetime
    }

    static new(title: string, startDatetime: Date, endDatetime: Date) {
        return new Schedule(title, startDatetime, endDatetime, uuidv4())
    }

    static fromRepostioryData(title: string, startDatetime: Date, endDatetime: Date, id: string) {
        return new Schedule(title, startDatetime, endDatetime, id)
    }

    title(): string {
        return this._title
    }

    startDatetime(): string {
        return format(this._startDatetime, "yyyy-MM-dd HH:mm");
    }

    endDatetime(): string {
        return format(this._endDatetime, "yyyy-MM-dd HH:mm");
    }

    id(): string {
        return this._id
    }

    private validateScheduleDuration(startDatetime: Date, endDatetime: Date) {
        if (!isBefore(startDatetime, endDatetime)) {
            const startDatetimeStr = format(startDatetime, "yyyy-MM-dd HH:mm");
            const endDatetimeStr = format(endDatetime, "yyyy-MM-dd HH:mm");
            throw new DomainError("Domain", `予定開始日時は予定終了日時より前に設定する必要があります startDatetime: ${startDatetimeStr} endDatetime: ${endDatetimeStr}`)
        }
    }
}