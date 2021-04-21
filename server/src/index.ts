import "dotenv/config";
import "reflect-metadata";
import "./utils/db";
import express from "express";

const main = async () => {
  const PORT = parseInt(process.env.PORT!) || 4000;
  const app: express.Express = express();

  app.listen(PORT, () => console.log(`listening port http://localhost:${PORT}`));
}

main();