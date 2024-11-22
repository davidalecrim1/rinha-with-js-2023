import express from "express";
import PersonRepository from "../infra/repository.js";
import PersonService from "../app/service.js";
import PersonController from "./controller.js";
import db from "../infra/database.js";

const router = express.Router();

const personRepository = new PersonRepository(db);
const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

router.get("/person", (req, res) => personController.getPerson(req, res));

router.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default router;
