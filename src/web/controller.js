import { body, validationResult } from "express-validator";
import { Person } from "../app/domain.js";
import { InvalidPerson, PersonAlreadyExists } from "../app/errors.js";

export const personValidation = [
  body("apelido").exists().notEmpty().isString().isLength({ max: 32 }),
  body("nome").exists().notEmpty().isString().isLength({ max: 100 }),
  body("nascimento")
    .exists()
    .notEmpty()
    .isString()
    .matches(/^\d{4}-\d{2}-\d{2}$/), // Regex to match the format YYYY-MM-DD,
  body("stack")
    .isArray()
    .optional({ nullable: true })
    .custom((value) => {
      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string" && item.length <= 32)
      )
        return true;
      else {
        throw new InvalidPerson();
      }
    }),
];

class PersonController {
  constructor(personService) {
    this.personService = personService;
  }

  async GetPersonById(req, res) {
    try {
      const result = await this.personService.GetPersonById(req.params.id);

      if (!result) {
        return res.status(404).send();
      }

      const response = {
        id: result.id,
        apelido: result.nickname,
        nome: result.name,
        nascimento: result.dob,
        stack: result.stack,
      };

      res.status(200).json(response);
    } catch (err) {
      console.log(`error in getPerson: ${err}`);
      res.status(500).send();
    }
  }

  async CreatePerson(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send();
      }

      const person = new Person(
        req.body.apelido,
        req.body.nome,
        req.body.nascimento,
        req.body.stack
      );

      await this.personService.CreatePerson(person);
      res.status(201).send();
    } catch (err) {
      if (err instanceof PersonAlreadyExists) {
        return res.sendStatus(422);
      }
      console.log(`error in createPerson: ${err}`);
      res.status(500).send();
    }
  }

  async CountPeople(req, res) {
    try {
      const count = await this.personService.GetPersonsCount();
      res.status(200).json(count);
    } catch (err) {
      console.log(`error in countPeople: ${err}`);
      res.sendStatus(500);
    }
  }

  async SearchPeople(req, res) {
    try {
      if (!req.query.t) {
        return res.status(200).json([]);
      }

      const people = await this.personService.SearchPeople(req.query.t);
      const response = people.map((person) => ({
        id: person.id,
        apelido: person.nickname,
        nome: person.name,
        nascimento: person.dob,
        stack: person.stack,
      }));

      res.status(200).json(response);
    } catch (err) {
      console.log(`error in SearchPeople: ${err}`);
      res.sendStatus(500);
    }
  }
}

export default PersonController;
