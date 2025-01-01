
import 'reflect-metadata';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';
import { UserRepository } from '../usecases/interface/UserRepository';
import { User } from '../models/User';

@injectable()
export class UserRepositoryMock implements UserRepository {

    private dataStore: Array<User> = []

    async save(user: User) {
        this.dataStore.push(user);
    }

    async list(): Promise<User[]> {
        return this.dataStore
    }

    findById(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.dataStore.find(user => user.id() === id)!);
        })
    }

    clear(): void {
        this.dataStore = []
    }
}