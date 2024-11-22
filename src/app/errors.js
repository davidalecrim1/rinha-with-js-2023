export class PersonAlreadyExists extends Error {
  constructor(message = "Person already exists!") {
    super(message);
  }
}

export class PersonInvalidNickname extends Error {
  constructor(message = "Person nickname is invalid!") {
    super(message);
  }
}
