import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hye there",
  });
});

app.listen(3000, () => {
  console.log("app is listing ..!");
});
