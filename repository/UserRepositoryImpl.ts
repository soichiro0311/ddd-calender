import { PrismaClient } from '.prisma/client';

import 'reflect-metadata';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';
import { UserRepository } from '../usecases/interface/UserRepository';
import { User } from '../models/User';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], })
    }

    async save(user: User) {
        await this.prisma.user.create({
            data: {
                id: user.id(),
                name: user.name(),
            },
        })
    }

    async list(): Promise<User[]> {
        return this.prisma.user.findMany({
            include: {
                schedules: true
            }
        }).then((users: any) => {
            const result = users.map((data: any) => User.fromRepostioryData(data))
            return result
        })
    }

    async findById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        }).then((result: any) => {
            return User.fromRepostioryData(result)
        })
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }
}