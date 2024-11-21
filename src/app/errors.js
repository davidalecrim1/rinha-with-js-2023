export class PersonAlreadyExists extends Error {
  constructor(message = "Person already exists!") {
    super(message);
  }
}
