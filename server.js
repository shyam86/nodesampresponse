const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/search", (req, res) => {
  let searchreq = req.body;
  let searchResp = JSON.parse(fs.readFileSync("searchresp.json"));
  res.send(JSON.stringify(searchResp));
});

app.post("/api/trackingdetails", (req, res) => {
  let trackingDetaisReq = req.body;
  let trackingDetaisResp;
console.log(trackingDetaisReq.fileno)
  switch (trackingDetaisReq.fileno) {
    case "101":
      trackingDetaisResp = JSON.parse(
        fs.readFileSync("trackingdetailsresp101.json")
      );
    case "102":
      trackingDetaisResp = JSON.parse(
        fs.readFileSync("trackingdetailsresp102.json")
      );
    case "103":
        trackingDetaisResp = JSON.parse(
          fs.readFileSync("trackingdetailsresp103.json")
        );
    case "104":
        trackingDetaisResp = JSON.parse(
          fs.readFileSync("trackingdetailsresp104.json")
        );
  }
  res.send(JSON.stringify(trackingDetaisResp));
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
