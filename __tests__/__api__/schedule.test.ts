import supertest from "supertest";
import { server } from "../../application";


describe("予定追加ユースケース", () => {
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
        expect(createdSchedule._startDatetime).toEqual("2024/12/11 12:00:00");
        expect(createdSchedule._endDatetime).toEqual("2024/12/11 13:00:00");
    });
});