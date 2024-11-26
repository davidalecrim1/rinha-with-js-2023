import { Person } from "../app/domain.ts";
import { PersonAlreadyExists } from "../app/errors.ts";
import logger from "../infra/logger.ts";
import PersonService from "../app/service.ts";
import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";

class PersonController {
  personService: PersonService;
  constructor(personService: PersonService) {
    this.personService = personService;
  }

  async GetPersonById(ctx: RouterContext<"/pessoas/:id">) {
    try {
      const id = ctx.params.id;

      if (!id) {
        ctx.response.status = 400;
        return;
      }

      const result = await this.personService.GetPersonById(id);

      if (!result || result === undefined) {
        ctx.response.status = 404;
        return;
      }

      ctx.response.status = 200;
      ctx.response.body = {
        id: result.id,
        apelido: result.nickname,
        nome: result.name,
        nascimento: result.dob,
        stack: result.stack,
      };
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`error in getPerson: ${err.stack}`);
      }
      ctx.response.status = 500;
    }
  }

  async CreatePerson(ctx: RouterContext<"/pessoas">) {
    try {
      const data = await ctx.request.body.json();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (
        data.apelido === null || data.apelido === undefined ||
        data.nome === null || data.nome === undefined ||
        data.apelido.length > 32 || data.nome.length > 100 ||
        !dateRegex.test(data.nascimento)
      ) {
        logger.debug(`CreatePerson - invalid request: ${JSON.stringify(data)}`);
        ctx.response.status = 422;
        return;
      }

      for (const stack of data.stack ?? []) {
        if (
          stack === null || stack === undefined || typeof stack != "string" ||
          stack.length > 32
        ) {
          logger.debug(
            `CreatePerson - invalid request: ${JSON.stringify(data)}`,
          );
          ctx.response.status = 422;
          return;
        }
      }

      const person = new Person(
        data.apelido,
        data.nome,
        data.nascimento,
        data.stack,
      );

      await this.personService.CreatePerson(person);

      ctx.response.status = 201;
      ctx.response.headers = new Headers({
        "Location": "/pessoas/" + person.id,
        "Content-Type": "application/json",
      });
    } catch (err) {
      if (err instanceof PersonAlreadyExists) {
        logger.debug(`CreatePerson - person already exists: ${err}`);
        ctx.response.status = 422;
        return;
      }
      if (err instanceof Error) {
        logger.error(`error in createPerson: ${err.stack}`);
        ctx.response.status = 500;
        return;
      }
      logger.error(err);
    }
  }

  async CountPeople(ctx: RouterContext<"/contagem-pessoas">) {
    try {
      ctx.response.status = 200;
      ctx.response.body = await this.personService.GetPersonsCount();
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`error in countPeople: ${err.stack}`);
        ctx.response.status = 500;
        return;
      }
      logger.error(err);
    }
  }

  async SearchPeople(ctx: RouterContext<"/pessoas">) {
    try {
      const term = ctx.request.url.searchParams.get("t");
      if (!term || term.trim() === "") {
        ctx.response.status = 400;
        return;
      }

      const people = await this.personService.SearchPeople(term);
      const response = people.map((person: Person) => ({
        id: person.id,
        apelido: person.nickname,
        nome: person.name,
        nascimento: person.dob,
        stack: person.stack,
      }));

      ctx.response.status = 200;
      ctx.response.body = response;
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`error in SearchPeople: ${err.stack}`);
        ctx.response.status = 500;
        return;
      }
      logger.error(err);
    }
  }
}

export default PersonController;
