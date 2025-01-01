
import { myContainer } from '../../application/inversify.config';
import { TYPES } from '../../application/types';
import { DomainError } from '../../error/domainError';
import { UserRepository } from '../../usecases/interface/UserRepository';
import { listUsers } from '../../usecases/listUsers';
import { convertUser } from './converter/userConverter';
import { registerUser } from '../../usecases/registerUser';

const repository = myContainer.get<UserRepository>(TYPES.UserRepository)

export const createUser = (request: any, response: any) => {
    try {
        const user = convertUser(request);
        registerUser(repository, user)
        response.status(200).end()
    } catch (e) {
        if (e instanceof DomainError) {
            response.status(400).send({ errorMessage: e.message })
        }
    }
};

export const allUsers = (_: any, response: any) => {
    listUsers(repository).then(allUsers => {
        response.status(200).send(allUsers)
    })
};
