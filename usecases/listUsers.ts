import { UserRepository } from './interface/UserRepository';

export const listUsers = (repository: UserRepository) => {
    const allUsers = repository.list().catch((e) => {
        // TODO: エラーハンドリング
        throw e;
    }).then((result) => {
        return result
    })
    return allUsers
}