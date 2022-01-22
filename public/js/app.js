console.log("client side javascript is loded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// grabbing the html element
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageone = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //it prevent the browser from being refreshed when we click search on form
  const location = search.value;

  messageone.textContent = "Loding...";
  messagetwo.textContent = "";

  //fetching weather data
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageone.textContent = data.error;
        } else {
          messageone.textContent = data.location;
          messagetwo.textContent = data.forecast;
        }
      });
    }
  );
});
