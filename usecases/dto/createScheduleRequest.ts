export class CreateScheduleRequest {
    private _title: string
    private _startDatetime: string
    private _endDatetime: string
    private _participants: string[]

    constructor(requestJson: any) {
        this._title = requestJson.body.title
        this._startDatetime = requestJson.body.startDatetime
        this._endDatetime = requestJson.body.endDatetime
        this._participants = requestJson.body.participants ? requestJson.body.participants : []
    }

    title() {
        return this._title
    }
    startDatetime() {
        return new Date(this._startDatetime)
    }
    endDatetime() {
        return new Date(this._endDatetime)
    }
    participants() {
        return this._participants
    }
}