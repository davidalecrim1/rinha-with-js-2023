import { body, validationResult } from "express-validator";

const validation = [body("apelido").notEmpty().isString()];

class PersonController {
  constructor(personService) {
    this.personService = personService;
  }

  async getPerson(req, res) {
    try {
      // TODO
    } catch (err) {
      // TODO
    }
  }

  async createPerson(req, res) {
    try {
      // TODO
    } catch (err) {
      // TODO
    }
  }
}

export default PersonController;
