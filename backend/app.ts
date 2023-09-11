require("dotenv").config();
import express from "express";
import { apiRouter } from "./src/routes";
import { initDB } from "./src/db";
import { notFound } from "./src/middleware/not-found";
import { errorHandlerMiddleware } from "./src/middleware/error-handler";

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
async function start() {
  let retries = 5;
  while (retries) {
    console.log(`Try Number: ${6 - retries}`);
    const successful = await initDB();
    if (successful) break;
    await new Promise((res) => setTimeout(res, 5000));
    retries -= 1;
  }

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
}

start();
