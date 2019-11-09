var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
// =====route==========
// ==search==
app.get("/", function(req, res) {
  res.render("search");
});
//==search==

app.get("/results", function(req, res) {
  let handle = req.query.cf_handle;
  let url = "https://codeforces.com/api/user.status?handle=" + handle;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
      // res.send(body);
      //   res.send(results["result"][0]); // add  ["verdict"] to find status of questions
    }
  });
});

// ============route============
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is runninng on port: ${port}`);
});
