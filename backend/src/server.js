// const express = require("express");
import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log("The server is running on PORT:", PORT);
});
