import { v4 as uuidv4 } from '../node_modules/uuid/dist/cjs';
import { ParticipationStatus } from './ParticipationStatus';
import { ScheduleParticipationStatus } from './ScheduleParticipationStatus';
import { DomainError } from '../error/domainError';

export class User {
    private _name: string;
    private _id: string
    private _status: ScheduleParticipationStatus[]

    constructor(id: string, name: string, status: ScheduleParticipationStatus[]) {
        this._id = id;
        this._name = name
        this._status = status
    }

    static fromRepostioryData(repositoryData: any): User {
        const status = repositoryData.schedules.map((schedule: any) => {
            return new ScheduleParticipationStatus(schedule.scheduleId, schedule.participationStatus)
        })
        return new User(repositoryData.id, repositoryData.name, status)
    }

    static new(name: string): User {
        const id = uuidv4()
        return new User(id, name, [])
    }

    status(scheduleId: string): ParticipationStatus {
        const targetScheduleStatus = this._status.find(status => status.scheduleId() === scheduleId)
        if (targetScheduleStatus == null) {
            // TODO: エラー処理をやる
            throw new DomainError("", "")
        }
        return targetScheduleStatus.participationStatus()
    }

    assign(scheduleId: string): void {
        this._status.push(new ScheduleParticipationStatus(scheduleId, ParticipationStatus.NOT_RESPOND))
    }

    respondToSchedule(scheduleId: string, updatedStatus: ParticipationStatus): void {
        const targetScheduleParticipationStatus = this._status.find(status => status.scheduleId() === scheduleId)
        if (targetScheduleParticipationStatus == null) {
            // TODO: エラー処理
            throw new DomainError("", "");
        }
        targetScheduleParticipationStatus.update(updatedStatus)
    }


    id() {
        return this._id
    }

    name() {
        return this._name
    }
}