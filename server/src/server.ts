require("dotenv").config()
import cors from "cors";
import router from "./routes/todo.routes";

const main = async (): Promise<void> => {
    const PORT = process.env.PORT
    const express = require("express");
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(router);

    app.listen(PORT, (): void => { console.log(`Server listening on ${PORT}`); });
};

main().catch((err) => {
    console.log(err);
});