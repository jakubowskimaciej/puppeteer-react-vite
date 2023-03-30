const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = 8080;
require("dotenv").config();
const puppeteer = require("puppeteer");
const screenshot = "github.png";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connect_err", (err) => {
  console.log(`connect_err due to ${err.message}`);
});

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("browse", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://github.com/login", {
      waitUntil: "load",
    });
    await page.type("#login_field", process.env.GITHUB_USER);
    await page.type("#password", process.env.GITHUB_PW);
    await page.click('[name="commit"]');
    await page.waitForNavigation();

    await delay(5000);
    await page.screenshot({ path: screenshot, fullPage: "true" });
    browser.close();
    console.log("I'm here. See screenshot:" + screenshot);
  });
});

server.listen(8080, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api", (req, res) => {
  const users = [
    { id: 1, name: "nga one" },
    { id: 2, name: "nga two" },
    { id: 3, name: "nga three" },
    { id: 4, name: "nga four" },
  ];
  res.json(users);
});
