// Selecting page elements
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const countryInput = document.querySelector("#countrySearch");
/*
const getCountry = function (country) {
  // Information to reach API
  const urlName = "https://restcountries.eu/rest/v2/name/";
  const request = new XMLHttpRequest();
  request.responseType = "json";

  // call country
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      const [data] = request.response;
      renderCountry(data);
    }
  };
  request.open("GET", `${urlName}${country}`);
  request.send();
};

// call country
btn.addEventListener('click', displayResults);
*/



const getCountry = function (country) {
  // Information to reach API
  const urlName = "https://restcountries.eu/rest/v2/name/";
  const urlalpha = "https://restcountries.eu/rest/v2/alpha/";
  const request = new XMLHttpRequest();

  // AJAX call country 1
  request.open("GET", `${urlName}${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);
    // Get neighbour country (2)
    const [neighbour] = data.borders;
    console.log(data.borders[0]);
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    //request2.responseType = 'json';
    request2.open("GET", `${urlalpha}${neighbour}`);
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, "neighbour");
    });
  });

};

// call country
btn.addEventListener('click', displayResults);
