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
    let searchPhrase = searchInput.value;
    if (onSubcatPage()) {
      nbc.availablePlaces = filterSearch(searchPhrase, nbc.places);
      nbc.focused.subcat = "Search";
      updateDom();
    } else {
      redirectToSubCat(searchPhrase);
    }
  });

  searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });
})()

function onSubcatPage() {
  return (window.location.href.includes("/subcategory.html")) ? true : false;
}

function redirectToSubCat(searchPhrase) {
  let proto = window.location.protocol;
  let host = "";
  let filepath = "";
  let params = "?search=" + searchPhrase;
  let isFile = proto == "file:";
  let currPage = window.location.href.split("/").pop().split("?")[0];

  if (isFile) {
    host = window.location.pathname.replace(currPage, "");
  } else {
    filepath = "/table-of-contents-style-homepage";
    host = window.location.hostname;
  }
  filepath += "subcategory.html";
  if (isFile) {
    window.location.replace(proto + "//" + host + filepath + params);
  } else {
    window.location.replace(proto + "//" + host + "/" + filepath + params);
  }
}

// Example of filtering using a search. Needs to have a value to test against in searchPhrase
function filterSearch(searchPhrase, dataset) {
  let charArray = ['.', ',', '-'];
  charArray.forEach(c => searchPhrase.replace(c, ' '));
  let searchWords = searchPhrase.split(' ');
  let newWords = [];
  for (let i = 0; i < searchWords.length; i++) {
    searchWords[i] = searchWords[i].trim();
  }
  let placeNotIncludes = (p, w) => {
    return (!p.name.toLowerCase().includes(w.toLowerCase()) && 
            !p.description.toLowerCase().includes(w.toLowerCase()) &&
            !p.address.toLowerCase().includes(w.toLowerCase()));
  }
  // 'p' represents a place being passed into this function.
  let filterFunc = (p) => {
    for (let i = 0; i < searchWords.length; i++) {
      let w = searchWords[i];
      if (placeNotIncludes(p, w)) {
        return false;
      }
    }
    return true;
  }
  return (searchPhrase != "") ?
    nbc.places.filter(p => filterFunc(p)) : dataset;
}