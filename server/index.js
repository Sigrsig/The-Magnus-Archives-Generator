const express = require("express");
const firstnames = require("./routes/firstnames");
const lastnames = require("./routes/lastnames");
const nouns = require("./routes/nouns");
const verbs = require("./routes/verbs");
const adj = require("./routes/adj");

const app = express();

app.use("/api/firstnames", firstnames);
app.use("/api/lastnames", lastnames);
app.use("/api/nouns", nouns);
app.use("/api/verbs", verbs);
app.use("/api/adj", adj);

app.get("/api", (req, res) => {
  res.send("Hello there from express");
});

app.listen(1234);
