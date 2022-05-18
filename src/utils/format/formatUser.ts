import { User } from "src/entities/User";

export const formatUser = (user: User) => {
  const userEntries = Object.entries(user).filter((ent) => {
    return ent[0] != "password";
  });

  const formattedUser = Object.fromEntries(userEntries);

  return formattedUser;
};
