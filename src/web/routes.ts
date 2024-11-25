import PersonRepository from "../infra/repository.ts";
import PersonService from "../app/service.ts";
import PersonController from "./controller.ts";
import db from "../infra/database.ts";
import { createPersonValidation } from "./middleware.ts";
import { Router } from "https://deno.land/x/oak@v17.1.3/router.ts";

const router = new Router();

const personRepository = new PersonRepository(db);
const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

router.get("/api/health", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { status: "ok" };
});

router.post(
  "/pessoas",
  createPersonValidation,
  async (ctx) => await personController.CreatePerson(ctx),
);

router.get(
  "/contagem-pessoas",
  async (ctx) => await personController.CountPeople(ctx),
);

router.get(
  "/pessoas/:id",
  async (ctx) => await personController.GetPersonById(ctx),
);

router.get(
  "/pessoas",
  async (ctx) => await personController.SearchPeople(ctx),
);

export default router;
