import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  foodDb,
  findReceipeById,
  addReceipe,
  findReceipe,
} from "./db";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/food", async (req, res) => {
  res.json(foodDb);
});

app.get("/api/food/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(findReceipeById(id));
});

app.get("/api/search", (req, res) => {
  const { name } = req.query;
  const data = findReceipe(name?.toString().toLowerCase() ?? "");
  console.log(data);
  res.json(data);
});

app.post("/api/food", (req, res) => {
  const incomingReceipe = req.body;
  addReceipe(incomingReceipe);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
