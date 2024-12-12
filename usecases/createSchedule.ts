import { PrismaClient } from '@prisma/client'

export const createSchedule = async () => {
    const prisma = new PrismaClient()
    await prisma.schedule.create({
        data: {
            title: '要件定義ウォークスルー',
            startDatetime: ' 2024/11/22 15:00',
            endDatetime: ' 2024/11/22 16:00',
        },
    })

    const allSchedules = await prisma.schedule.findMany()
    console.dir(allSchedules, { depth: null })
}

createSchedule().catch((e) => {
    throw e
})
