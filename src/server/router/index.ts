// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { authRouter } from "./auth";
import { projectsRouter } from "./projects";
import { usersRouter } from "./users";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("projects.", projectsRouter)
  .merge("auth.", authRouter)
  .merge("users.", usersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
