import { v4 as uuidv4 } from "../../node_modules/uuid/dist/cjs";

export class User {
  private _name: string;
  private _id: string;

  private constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  static fromRepostioryData(repositoryData: any): User {
    return new User(repositoryData.id, repositoryData.name);
  }

  static fromScheduleRepostioryData(
    repositoryData: any
  ): any {
    return new User(
      repositoryData.user.id,
      repositoryData.user.name
    );
  }

  static new(name: string): User {
    const id = uuidv4();
    return new User(id, name);
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }
}
