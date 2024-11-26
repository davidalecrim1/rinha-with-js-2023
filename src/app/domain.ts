import {
  PersonInvalidDob,
  PersonInvalidName,
  PersonInvalidNickname,
  PersonInvalidStack,
} from "./errors.ts";

export class Person {
  id: string;
  nickname: string;
  name: string;
  dob: string;
  stack: Array<string>;

  constructor(
    nickname: string,
    name: string,
    dob: string,
    stack: Array<string>,
  ) {
    this.id = crypto.randomUUID();
    this.nickname = nickname;
    this.name = name;
    this.dob = dob;
    this.stack = stack;

    this.validate();
  }

  private validate() {
    if (
      this.nickname === null || this.nickname === undefined ||
      this.nickname.length > 32
    ) {
      throw new PersonInvalidNickname();
    }

    if (
      this.name === null || this.name === undefined || this.name.length > 100
    ) {
      throw new PersonInvalidName();
    }

    if (!this.isValidDate(this.dob)) {
      throw new PersonInvalidDob();
    }

    for (const stack of this.stack ?? []) {
      if (
        stack === null || stack === undefined || stack.length > 32
      ) {
        throw new PersonInvalidStack();
      }
    }
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Valid if `getTime` doesn't return NaN
  }
}
