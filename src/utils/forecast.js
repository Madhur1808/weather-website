const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1c80fe1555b5b60cb32f784055e034d3&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  //object shorthand in request option object and destructuring in response object
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find data", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " . It is curently " +
          body.current.temperature +
          " degree  outside, but it feels like " +
          body.current.feelslike +
          " degree . Humidity outside is  " +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
