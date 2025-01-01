import supertest from "supertest";
import { server } from "../../application/route";
import { myContainer } from '../../application/inversify.config';
import { UserRepository } from "../../usecases/interface/UserRepository";
import { TYPES } from "../../application/types";
import { ScheduleRepository } from '../../usecases/interface/scheduleRepository';
import { ParticipationStatus } from "../../models/ParticipationStatus";


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
        const createdSchedule = response.body[0]
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(createdSchedule._title).toEqual("詳細設計レビュー");
        expect(createdSchedule._startDatetime).toEqual("2024-12-11T03:00:00.000Z");
        expect(createdSchedule._endDatetime).toEqual("2024-12-11T04:00:00.000Z");
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

        const createdSchedule = response.body[0]
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(createdSchedule._title).toEqual("詳細設計レビュー");
        expect(createdSchedule._startDatetime).toEqual("2024-12-11T03:00:00.000Z");
        expect(createdSchedule._endDatetime).toEqual("2024-12-11T04:00:00.000Z");
        expect(createdSchedule._participants[0]._name).toEqual("テスト太郎");
        expect(createdSchedule._participants[0]._status[0]._status).toEqual(ParticipationStatus.NOT_RESPOND);
    });
});