import UserRepository from "../../repositories/UserRepository";
import { RegisterInput, ErrorField } from "../../types/types";

export const validateRegisterInput = async (
  input: RegisterInput
): Promise<ErrorField[]> => {
  let errors: ErrorField[] = [];

  //Validate input
  if (input.username.length < 3 || input.username.length > 20) {
    errors = [
      ...errors,
      {
        field: "username",
        message: "Username must be between 3 and 20 characters",
      },
    ];
  }

  if (input.firstname.length < 3 || input.firstname.length > 20) {
    errors = [
      ...errors,
      {
        field: "firstname",
        message: "firstname must be between 3 and 20 characters",
      },
    ];
  }
  if (input.lastname.length < 3 || input.lastname.length > 20) {
    errors = [
      ...errors,
      {
        field: "lastname",
        message: "lastname must be between 3 and 20 characters",
      },
    ];
  }
  if (input.password != input.confirmedPassword) {
    errors = [
      ...errors,
      {
        field: "confirmedPassword",
        message: "Passwords are not matching",
      },
    ];
  }
  const us = (
    await UserRepository.find({
      where: {
        $or: [
          { username: { $regex: input.username, $options: "-i" } },
          { email: { $regex: input.email, $options: "-i" } },
        ],
      },
    })
  )[0];
  if (us) {
    if (us.username.toLowerCase() === input.username.toLowerCase()) {
      errors = [
        ...errors,
        {
          field: "username",
          message: "username already used",
        },
      ];
    }
    if (input.email.toLowerCase() === input.email.toLowerCase()) {
      errors = [
        ...errors,
        {
          field: "email",
          message: "email already used",
        },
      ];
    }
  }
  return errors;
};
