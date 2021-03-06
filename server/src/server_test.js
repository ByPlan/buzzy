import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import http from "http";
import { ip_test } from "./constants/url.js";
import authRouter from "./api/routes/auth.routes.js";
import userRouter from "./api/routes/user.routes.js";
import groupRouter from "./api/routes/group.routes.js";
import meetingRouter from "./api/routes/meeting.routes.js";
import questionRouter from "./api/routes/question.routes.js";
import postRouter from "./api/routes/post.routes.js";
import commentRouter from "./api/routes/comment.routes.js";
import socketRouter from "./api/routes/socket.routes.js";
import testRouter from "./api/routes/test.routes.js";
import db from "./db/models/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8000;
let corsOptions = {
  origin: ip_test + ":" + PORT,
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

await db.sequelize.authenticate();

// routes
authRouter(app);
userRouter(app);
groupRouter(app);
meetingRouter(app);
questionRouter(app);
commentRouter(app);
postRouter(app);
testRouter(app);
socketRouter(io);

// development mode
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB");
// });

// db.sequelize.sync();

// listen for requests
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
