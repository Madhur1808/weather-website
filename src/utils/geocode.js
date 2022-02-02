const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmlsbHlidWNoZXIiLCJhIjoiY2t5aGR0NjFoMTA3OTJucG14eHp3dndpYyJ9.vhklUUGLE6k_eE-R_y7zjw&limit=1";
  //object shorthand in request option object and destructuring in response object
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(" ! Unable to connect to location", undefined);
    } else if (body.features.length === 0) {
      callback(" ! Unable to find Loacation try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
