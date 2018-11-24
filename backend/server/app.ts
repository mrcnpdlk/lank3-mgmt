import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
// Import controllers
import itemsController from "./items/items.controller";
import usersController from "./users/users.controller";

// Put dotenv in use before importing controllers
dotenv.config({path: "./../.env"});

// Create the express application
const app = express();

// Assign controllers to routes
app.use("/api/items", itemsController);
app.use("/api/users", usersController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve("..", "frontend", "build")));

// Intercept requests to return the frontend's static entry point
app.get("*", (request, response) => {
    response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

export default app;
