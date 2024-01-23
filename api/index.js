import express from "express";
import userRoutes from "./user/user.route.js";
import { connectDb } from "./connect.db.js";

const app = express();

// to make app understand json
app.use(express.json());

// connect database
connectDb();

// register routes
app.use(userRoutes);

// port
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
