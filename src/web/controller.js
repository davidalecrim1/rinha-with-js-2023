import { validationResult } from "express-validator";
import { Person } from "../app/domain.js";
import { PersonAlreadyExists } from "../app/errors.js";

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
      console.log(`error in getPerson: ${err.stack}`);
      res.status(500).send();
    }
  }

  async CreatePerson(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        for (const error of errors.array()) {
          if (error.msg == "Invalid person!") {
            return res.status(400).send();
          }
          if (error.value != null && !isNaN(error.value)) {
            return res.status(400).send();
          }
        }

        return res.status(422).send();
      }

      const person = new Person(
        req.body.apelido,
        req.body.nome,
        req.body.nascimento,
        req.body.stack
      );

      await this.personService.CreatePerson(person);
      res.header("Location", "/pessoas/" + person.id);
      res.status(201).send();
    } catch (err) {
      if (err instanceof PersonAlreadyExists) {
        return res.sendStatus(422);
      }
      console.log(`error in createPerson: ${err.stack}`);
      res.status(500).send();
    }
  }

  async CountPeople(req, res) {
    try {
      const count = await this.personService.GetPersonsCount();
      res.status(200).json(count);
    } catch (err) {
      console.log(`error in countPeople: ${err.stack}`);
      res.sendStatus(500);
    }
  }

  async SearchPeople(req, res) {
    try {
      if (!req.query.t) {
        return res.sendStatus(400);
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
      console.log(`error in SearchPeople: ${err.stack}`);
      res.sendStatus(500);
    }
  }
}

export default PersonController;
