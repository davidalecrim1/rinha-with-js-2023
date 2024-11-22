import express from "express";
import PersonRepository from "../infra/repository.js";
import PersonService from "../app/service.js";
import PersonController, { personValidation } from "./controller.js";
import db from "../infra/database.js";

const router = express.Router();

const personRepository = new PersonRepository(db);
const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

// router.get("/pessoas", (req, res) => personController.getPerson(req, res));

router.post("/pessoas", personValidation, (req, res) =>
  personController.CreatePerson(req, res)
);

router.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/contagem-pessoas", (req, res) =>
  personController.CountPeople(req, res)
);

router.get("/pessoas/:id", (req, res) =>
  personController.GetPersonById(req, res)
);

router.get("/pessoas", (req, res) => personController.SearchPeople(req, res));

export default router;
