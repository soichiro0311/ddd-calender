import express from "express";
import { allSchedules, createSchdule } from "../presentation/rest/schduleController";
import { allUsers, createUser } from '../presentation/rest/userController';


export const server = express();

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.get("/schedule", allSchedules)
server.post("/schedule", createSchdule)

server.get("/user", allUsers)
server.post("/user", createUser)