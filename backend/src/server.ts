import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";

const app = express();

const appRouter = trpc
  .router()
  .query("getUser", {
    input: z.object({ id: z.string() }),
    async resolve(req) {
      req.input; // string
      return { id: req.input, name: "Bilbo" };
    },
  })
  .mutation("createUser", {
    // validate input with Zod
    input: z.object({ firstName: z.string().min(5) }),
    async resolve(req) {
      return { id: req.input, name: "Frodo" };
    },
  });

// created for each request
const createContext = ({
  req: _req,
  res: _res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
// type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// export type definition of API
export type AppRouter = typeof appRouter;

app.listen(4000);
