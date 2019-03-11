const express = require("express");
const request = require("request");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results", function(req, res) {
  let search = "q=" + req.query.search;
  let ingredients = "i=" + req.query.ingredients;
  let url = `http://www.recipepuppy.com/api/?${search}&${ingredients}`;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let recipes = JSON.parse(body);
      res.render("results", {recipes: recipes});
    }
  });
});

// // for local hosting:
// app.listen(3000, function() {
//   console.log("SERVER HAS STARTED: LOCALHOST:3000");
// });

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("SERVER HAS STARTED: LOCALHOST:3000");
});
