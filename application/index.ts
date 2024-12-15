import express from "express";
import { allSchedules, createSchdule } from "../presentation/rest/schduleController";


export const server = express();

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.get("/schedule", allSchedules)
server.post("/schedule", createSchdule)

server.listen(3000)