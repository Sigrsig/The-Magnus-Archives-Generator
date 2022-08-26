const express = require("express");
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const path = require("path");
__dirname = path.resolve();

const firstnames = require("./routes/firstnames");
const lastnames = require("./routes/lastnames");
const nouns = require("./routes/nouns");
const verbs = require("./routes/verbs");
const adj = require("./routes/adj");
const jobs = require("./routes/jobs");

const app = express();

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:1234",
  "https://shrouded-journey-38552.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
// --> Add this
app.use(cors(corsOptions));

app.use("/api/firstnames", firstnames);
app.use("/api/lastnames", lastnames);
app.use("/api/nouns", nouns);
app.use("/api/verbs", verbs);
app.use("/api/adj", adj);
app.use("/api/jobs", jobs);

app.get("/api", (req, res) => {
  res.send("Hello there from express");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(1234);
