const path = require("path"); //no need to install it coz it is core node module
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//setup handlebars engine and views loaction
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialsPath); //takes a path to the directory where our partials live

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "shutikshan madhur",
  }); //render allows us to render one of our views,we can render our handle bars temlates
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "shutikshan madhur",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "this is some helpfull text",
    title: "Help",
    name: "shutikshan madhur",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error: error });
        }

        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Help article not found",
    name: "shutikshan madhur",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Page not found",
    name: "Shutikshan Madhur",
  });
});
//here we are starting our server
app.listen(3000, () => {
  console.log("The server is up on port 3000");
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello express</h1> ");/
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "shutikshan",
//       age: 27,
//     },
//     {
//       name: "madhur",
//       age: 27,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>This is about page</h1> ");
// })
