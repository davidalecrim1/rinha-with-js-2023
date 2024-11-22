export class PersonAlreadyExists extends Error {
  constructor(message = "Person already exists!") {
    super(message);
  }
}

export class InvalidPerson extends Error {
  constructor(message = "Invalid person!") {
    super(message);
  }
}
