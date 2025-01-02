import { ParticipantDto } from "./ParticipantDto";
import { Schedule } from '../../models/schedule';

export class ScheduleDto {
    id: string
    title: string;
    startDatetime: string
    endDatetime: string
    participants: ParticipantDto[];

    constructor(model: Schedule) {
        this.id = model.id()
        this.title = model.title()
        this.startDatetime = model.startDatetime()
        this.endDatetime = model.endDatetime()
        this.participants = model.participants().map(participant => new ParticipantDto(participant))
    }

}