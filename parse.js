const btn = document.querySelector("button");
const textField = document.querySelector(".info");

btn.addEventListener("click", () => {
  (async function () {
    console.log("started fetching...");
    try {
      fetch("http://localhost:3000", {
        method: "GET",
        mode: "cors",
      })
        .then(response => {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(data => {
            console.log(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });

    } catch (e) {
      console.log("fetch failed...");
      console.log(e);
    }
    console.log(`ended fetching...`);
  })();
});
