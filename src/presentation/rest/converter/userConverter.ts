import { User } from "../../../models/User";

export const convertUser = (requestJson: any) => {
  const name = requestJson.body.name;
  return User.new(name);
};
