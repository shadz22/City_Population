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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatch() {
  const matchArray = findPlaces(this.value, places);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  
  suggestions.innerHTML = html;
}

const input = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

input.addEventListener('change', displayMatch);
input.addEventListener('keyup', displayMatch);
