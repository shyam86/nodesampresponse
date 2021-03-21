const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const multer = require('multer');
const app = express();
app.use(cors());
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

let upload = multer({ storage: storage }).single('file')
let uploadAll =  multer({ storage: storage }).array('file');


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

app.post('/api/upload',function(req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

app.post('/api/uploadAll',function(req, res) {

    uploadAll(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

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
      break;
    case "102":
      trackingDetaisResp = JSON.parse(
        fs.readFileSync("trackingdetailsresp102.json")
      );
      break;
    case "103":
        trackingDetaisResp = JSON.parse(
          fs.readFileSync("trackingdetailsresp103.json")
        );
        break;
    case "104":
        trackingDetaisResp = JSON.parse(
          fs.readFileSync("trackingdetailsresp104.json")
        );
        break;
  }
  res.send(JSON.stringify(trackingDetaisResp));
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
