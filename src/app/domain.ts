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
  }
}
