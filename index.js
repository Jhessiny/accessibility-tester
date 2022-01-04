const pa11y = require("pa11y");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.get("/api/test", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "url is required" });
  } else {
    const results = await pa11y(url);
    res.status(200).json(results);
  }
});

app.listen(PORT, () => console.log("server running on port " + PORT));
