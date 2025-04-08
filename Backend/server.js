import express from "express";

const app = express();
const PORT = 5080;

app.listen(PORT, () => {
    console.log(`✅ Servern körs på http://localhost:${PORT}`);
  });