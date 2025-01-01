import { User } from "../../models/User";

export interface UserRepository {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    findById(id: string): Promise<User>;
    clear(): void;
}