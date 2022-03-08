import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());
app.post("/weather", async (req, res) => {
  let cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).json({ weatherText: "City is not found!" });
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
      );
      const data = await response.json();
      const { name } = data;
      const { temp } = data.main;
      res.status(200).send({ weatherText: `${name} - ${temp}` });
    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
  }
});

export default app;
