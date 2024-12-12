import { Schedule } from "../schedule";
import { parse } from 'date-fns';
import { DomainError } from "../../error/domainError";
import { toZonedTime } from 'date-fns-tz'

describe("スケジュールを作成する", () => {
    it("タイトルと予定開始日時と予定終了日時がオブジェクトの作成に必要なこと", () => {
        const startDatetime = parse('2024-11-22 15:00', 'yyyy-MM-dd HH:mm', new Date());
        const endDatetime = parse('2024-11-22 16:00', 'yyyy-MM-dd HH:mm', new Date());

        const schedule = new Schedule("要件定義ウォークスルー", startDatetime, endDatetime)
        expect("要件定義ウォークスルー").toBe(schedule.title())
        expect(startDatetime).toBe(schedule.startDatetime())
        expect(endDatetime).toBe(schedule.endDatetime())
    })
    describe("予定終了日時は予定開始日時より後でなければ予定は作成できない", () => {
        it("予定開始日時が予定終了日時と同じ場合は予定を作成できないこと", () => {
            const startDatetimeUtc = parse('2024-11-22 10:00', 'yyyy-MM-dd HH:mm', new Date());
            const startDatetime = toZonedTime(startDatetimeUtc, 'Asia/Tokyo')

            const endDatetimeUtc = parse('2024-11-22 10:00', 'yyyy-MM-dd HH:mm', new Date());
            const endDatetime = toZonedTime(endDatetimeUtc, 'Asia/Tokyo')

            try {
                new Schedule("要件定義ウォークスルー", startDatetime, endDatetime);
                fail();
            } catch (e) {
                const error = e as DomainError;
                expect(error.message).toBe("予定開始日時は予定終了日時より前に設定する必要があります startDatetime: 2024-11-22 10:00 endDatetime: 2024-11-22 10:00")
            }
        })
        it("予定開始日時が予定終了日時より後の場合は予定を作成できないこと", () => {
            const startDatetimeUtc = parse('2024-11-22 10:01', 'yyyy-MM-dd HH:mm', new Date());
            const startDatetime = toZonedTime(startDatetimeUtc, 'Asia/Tokyo')

            const endDatetimeUtc = parse('2024-11-22 10:00', 'yyyy-MM-dd HH:mm', new Date());
            const endDatetime = toZonedTime(endDatetimeUtc, 'Asia/Tokyo')

            try {
                new Schedule("要件定義ウォークスルー", startDatetime, endDatetime);
                fail();
            } catch (e) {
                const error = e as DomainError;
                expect(error.message).toBe("予定開始日時は予定終了日時より前に設定する必要があります startDatetime: 2024-11-22 10:01 endDatetime: 2024-11-22 10:00")
            }
        })
    })
})