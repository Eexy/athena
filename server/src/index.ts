import "dotenv/config";
import "reflect-metadata";
import "./utils/db";
import express from "express";
import cors from "cors";

const main = async () => {
  const PORT = parseInt(process.env.PORT!) || 4000;
  const app: express.Express = express();

  app.use(cors());

  app.listen(PORT, () => console.log(`listening port http://localhost:${PORT}`));
}

main();