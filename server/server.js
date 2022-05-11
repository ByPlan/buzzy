import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import http from "http";
import { ip } from "./src/constants/url.js";
import authRouter from "./src/api/routes/auth.routes.js";
import userRouter from "./src/api/routes/user.routes.js";
import groupRouter from "./src/api/routes/group.routes.js";
import socketRouter from "./src/api/routes/socket.routes.js";
import db from "./src/models/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8000;
let corsOptions = {
  origin: ip,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to planby application." });
});

// routes
authRouter(app);
userRouter(app);
groupRouter(app);
socketRouter(io);

// initialize db
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// development mode
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync DB");
  initial();
});
// db.sequelize.sync();

// listen for requests
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
