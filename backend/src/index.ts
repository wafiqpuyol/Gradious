import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { DBInit, PORT } from "./config/index"
import apiRoutes from "./routes"

DBInit()
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use("/api", apiRoutes);
app.listen(PORT || 3000, () => console.log(`Server is running on port ${PORT}`));