(function(){

  const searchWrapper = document.getElementById('searchWrapper');
  const searchInput   = document.getElementById('searchInput');
  let searchToggles   = document.querySelectorAll(".search-toggle");
  let searchButton = document.getElementsByClassName("search-button")[0];

  searchToggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      if (searchWrapper.classList.contains('hidden')) {
        searchToggles.forEach(t => {
          t.classList.add('searchIsActive');
          t.setAttribute('src', 'images/close-24px.svg');
        });
        searchWrapper.classList.remove('hidden');
        // NOTE: We should probably focus the search input field here
        searchInput.focus();
      } else {
        searchToggles.forEach(t => {
          t.classList.remove('searchIsActive');
          t.setAttribute('src', 'images/search-24px.svg');
        });
        searchWrapper.classList.add('hidden');
      }
    });
  });

  searchButton.addEventListener('click', () => {
    console.log(filterSearch(nbc.places));
  });
})()

// Example of filtering using a search. Needs to have a value to test against in searchPhrase
function filterSearch(dataset) {
  let searchPhrase = document.getElementById("searchInput").value;
  let charArray = ['.', ',', '-'];
  charArray.forEach(c => searchPhrase.replace(c, ' '));
  let searchWords = searchPhrase.split(' ');
  for (let i = 0; i < searchWords.length; i++) {
    searchWords[i] = searchWords[i].trim();
  }
  console.log(searchWords);
  // 'p' represents a place being passed into this function.
  let filterFunc = (p) => {
    for (let i = 0; i < searchWords.length; i++) {
      if (!p.name.includes(searchWords[i]) && !p.description.includes(searchWords[i])) {
        return false;
      }
    }
    return true;
  }
  return (searchPhrase != "") ?
    nbc.places.filter(p => filterFunc(p)) : dataset;
}