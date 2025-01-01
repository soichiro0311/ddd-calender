
import { UserRepository } from './interface/UserRepository';
import { User } from '../models/User';

export const registerUser = (repository: UserRepository, user: User) => {
    repository.save(user).catch((e) => {
        // TODO: エラーハンドリング
        throw e;
    })
}