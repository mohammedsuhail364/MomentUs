import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientPath));

  // SPA fallback (Node 22 + Express safe)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
