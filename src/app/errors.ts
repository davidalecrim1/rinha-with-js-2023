export class PersonAlreadyExists extends Error {
  constructor(message = "Person already exists!") {
    super(message);
  }
}

export class PersonInvalidNickname extends Error {
  constructor(message = "The person nickname is invalid") {
    super(message);
  }
}

export class PersonInvalidName extends Error {
  constructor(message = "The person name is invalid") {
    super(message);
  }
}

export class PersonInvalidDob extends Error {
  constructor(message = "The person name date of birth is invalid") {
    super(message);
  }
}

export class PersonInvalidStack extends Error {
  constructor(message = "The person name date of birth is invalid") {
    super(message);
  }
}
