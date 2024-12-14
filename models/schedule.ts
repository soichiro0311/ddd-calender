import { isBefore, format } from "date-fns";
import { DomainError } from "../error/domainError";

export class Schedule {

    private _title: string;
    private _startDatetime: Date;
    private _endDatetime: Date;

    constructor(title: string, startDatetime: Date, endDatetime: Date) {
        this.validateScheduleDuration(startDatetime, endDatetime);
        this._title = title
        this._startDatetime = startDatetime
        this._endDatetime = endDatetime
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

    private validateScheduleDuration(startDatetime: Date, endDatetime: Date) {
        if (!isBefore(startDatetime, endDatetime)) {
            const startDatetimeStr = format(startDatetime, "yyyy-MM-dd HH:mm");
            const endDatetimeStr = format(endDatetime, "yyyy-MM-dd HH:mm");
            throw new DomainError("Domain", `予定開始日時は予定終了日時より前に設定する必要があります startDatetime: ${startDatetimeStr} endDatetime: ${endDatetimeStr}`)
        }
    }

}