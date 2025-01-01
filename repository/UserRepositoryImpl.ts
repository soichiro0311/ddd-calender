import { PrismaClient } from '.prisma/client';

import 'reflect-metadata';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';
import { UserRepository } from '../usecases/interface/UserRepository';
import { User } from '../models/User';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
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
        return this.prisma.user.findMany().then((users: any) => {
            const result = users.map((data: any) => User.fromRepostioryData(data))
            return result
        })
    }
}