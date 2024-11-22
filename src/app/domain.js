import { v4 as uuidv4 } from "uuid";

export class Person {
  constructor(nickname, name, dob, stack) {
    this.id = uuidv4();
    this.nickname = nickname;
    this.name = name;
    this.dob = dob;
    this.stack = stack;
  }
}
