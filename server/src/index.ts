import "./load-env";
import "reflect-metadata";
import "./utils/db";
import express, { Response } from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/todo-resolver";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/user-resolver";
import cookieParser from "cookie-parser";

const main = async () => {
  const PORT = parseInt(process.env.PORT!) || 4000;
  const app: express.Express = express();

  app.use(cors());
  app.use(cookieParser());

  app.get("/", (_, res: Response) => {
    res
      .status(200)
      .send(
        '<p>You can check the <a href="https://github.com/Eexy/athena/tree/main/server">Git repo</a></p>'
      );
  });

  const schema = await buildSchema({
    resolvers: [TodoResolver, UserResolver],
  });

  const apolloServer: ApolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`listening port http://localhost:${PORT}`)
  );
};

main();
