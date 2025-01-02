import { ParticipationStatus } from './ParticipationStatus';
import { User } from './User';

export class Participant {
    private _scheduleId: string;
    private _userId: string;
    private _name: string;
    private _status: ParticipationStatus

    private constructor(scheduleId: string, userId: string, userName: string, status: ParticipationStatus) {
        this._scheduleId = scheduleId;
        this._userId = userId
        this._name = userName
        this._status = status
    }

    static fromScheduleRepositoryData(repositoryData: any) {
        return new Participant(repositoryData.scheduleId, repositoryData.user.id, repositoryData.user.name, repositoryData.participationStatus);
    }

    static new(scheduleId: string, userId: string, userName: string) {
        return new Participant(scheduleId, userId, userName, ParticipationStatus.NOT_RESPOND);
    }

    userId() {
        return this._userId
    }

    userName() {
        return this._name
    }

    scheduleId() {
        return this._scheduleId
    }

    status() {
        return this._status
    }

    respondToSchedule(updatedStatus: ParticipationStatus): void {
        this._status = updatedStatus
    }
}