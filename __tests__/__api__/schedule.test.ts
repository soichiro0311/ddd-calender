import supertest from "supertest";
import { server } from "../../application/route";
import { myContainer } from '../../application/inversify.config';
import { UserRepository } from "../../usecases/interface/UserRepository";
import { TYPES } from "../../application/types";
import { ScheduleRepository } from '../../usecases/interface/scheduleRepository';
import { ParticipationStatus } from "../../models/ParticipationStatus";
import { ScheduleDto } from '../../presentation/rest/ScheduleDto';


describe("予定追加ユースケース", () => {
    beforeEach(() => {
        myContainer.get<UserRepository>(TYPES.UserRepository).clear()
        myContainer.get<ScheduleRepository>(TYPES.ScheduleRepository).clear()
    })
    it("追加した予定が確認できること", async () => {
        const request = supertest(server);
        await request.post("/schedule").send({
            title: "詳細設計レビュー",
            startDatetime: "2024/12/11 12:00:00",
            endDatetime: "2024/12/11 13:00:00"
        });

        const response = await request.get("/schedule");
        const createdSchedule = response.body[0] as ScheduleDto
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(createdSchedule.title).toEqual("詳細設計レビュー");
        expect(createdSchedule.startDatetime).toEqual("2024-12-11 12:00");
        expect(createdSchedule.endDatetime).toEqual("2024-12-11 13:00");
    });
    it("予定の開始時間を終了時間と同じにしている場合、エラーが返却されること", async () => {
        const request = supertest(server);
        const response = await request.post("/schedule").send({
            title: "詳細設計レビュー",
            startDatetime: "2024/12/11 12:00:00",
            endDatetime: "2024/12/11 12:00:00"
        });

        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toEqual("予定開始日時は予定終了日時より前に設定する必要があります startDatetime: 2024-12-11 12:00 endDatetime: 2024-12-11 12:00");
    });
    it("参加者込みで予定を追加できること", async () => {
        const request = supertest(server);
        await request.post("/user").send({
            name: "テスト太郎",
        });
        const registeredUser = await request.get("/user")

        await request.post("/schedule").send({
            title: "詳細設計レビュー",
            startDatetime: "2024/12/11 12:00:00",
            endDatetime: "2024/12/11 13:00:00",
            participants: [registeredUser.body[0]._id]
        });

        const response = await request.get("/schedule");

        const createdSchedule = response.body[0] as ScheduleDto
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(createdSchedule.title).toEqual("詳細設計レビュー");
        expect(createdSchedule.startDatetime).toEqual("2024-12-11 12:00");
        expect(createdSchedule.endDatetime).toEqual("2024-12-11 13:00");
        expect(createdSchedule.participants[0].name).toEqual("テスト太郎");
        expect(createdSchedule.participants[0].participationStatus).toEqual(ParticipationStatus.NOT_RESPOND);
    });
});