import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`✅ Servern körs på http://localhost:${PORT}`);
  });