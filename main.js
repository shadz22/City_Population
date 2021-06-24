const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const places = [];

fetch(endpoint)
.then(res => res.json())
.then(data => places.push(...data));

function findPlaces(wordToSearch, places) {
  return places.filter(place => {
    const regex = new RegExp(wordToSearch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}

const input = document.querySelector('.search');
input.addEventListener('change', displayMatch);
