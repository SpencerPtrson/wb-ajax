import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div  
  let div = document.getElementById("dog-image");
  let imgElement;
  if (div.firstChild) imgElement = div.firstChild;
  else { 
    imgElement = document.createElement("img");
    imgElement.setAttribute("alt", "Missing Photo");
    imgElement.setAttribute("height", "200px");
    div.append(imgElement);
  }

  const response = await axios.get('https://dog.ceo/api/breeds/image/random');
  if (response.data.status === "success") {
    imgElement.setAttribute("src", response.data.message);
  };
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  
  // axios.get() needs a url
  // in this scenario, we're making a call to the url /weather.txt -> urlString = '/weather.txt'
  // we're passing in the zipcode as a query parameter to that url -> 'urlString?' + queryParameters (parameterName=Value)
  const url = `/weather.txt/?zipcode=${zipcode}`
  const response = await axios.get(url);
  const weatherInfoElement = document.querySelector("#weather-info");
  weatherInfoElement.textContent = response.data;
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault();
  
  const formData = {
    cookieType: document.querySelector("#cookie-type-field").value,
    qty: document.querySelector("#qty-field").value
  }
  console.log("Form Data:", formData);
  const response = await axios.post("/order-cookies.json", formData);
  console.log(response);

  // TODO: show the result message after your form
  const responseField = document.querySelector("#order-status");
  responseField.textContent = response.data.message;

  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  if (response.data.resultCode === "ERROR") responseField.style.color = "red";

}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // Sample URL: https://itunes.apple.com/search?parameterkeyvalue.
  const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&country=US`);
  console.log(response.data);

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
  let displayList = document.querySelector("#itunes-results");
  displayList.innerHTML = ""; // clear previous results;
  let itunesResults = response.data.results;
  itunesResults.forEach(song => {
    displayList.innerHTML += `Artist: ${song.artistName} - Song: ${song.trackName}<br>`;
  });


}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
