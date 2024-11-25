import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import logger from "../infra/logger.ts";

export async function createPersonValidation(ctx: any, next: any) {
  try {
    const data = await ctx.request.body.json();
    personSchema.parse(data);
    await next();
  } catch (err) {
    logger.debug(`invalid request: ${err}`);
    ctx.response.status = 400;
  }
}

const personSchema = z.object({
  apelido: z.string().nullable(),
  nome: z.string().nullable(),
  nascimento: z.string().nullable(),
  stack: z.array(z.string()).optional().nullable(),
});
