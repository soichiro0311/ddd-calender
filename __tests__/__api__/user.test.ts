import supertest from "supertest";
import { server } from "../../application/route";

describe("ユーザ情報確認ユースケース", () => {
  it("追加したユーザの情報が確認できること", async () => {
    const request = supertest(server);
    await request.post("/user").send({
      name: "山田太郎",
    });

    const response = await request.get("/user");
    const createdSchedule = response.body[0];
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(createdSchedule._name).toEqual("山田太郎");
  });
});
