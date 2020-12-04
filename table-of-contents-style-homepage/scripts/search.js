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
    let searchPhrase = document.getElementById("searchInput").value;
    if (onSubcatPage()) {
      nbc.availablePlaces = filterSearch(searchPhrase, nbc.places);
      updateDom();
    } else {
      redirectToSubCat(searchPhrase);
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
    window.location.replace(filepath + params);
  }
}

// Example of filtering using a search. Needs to have a value to test against in searchPhrase
function filterSearch(searchPhrase, dataset) {
  let charArray = ['.', ',', '-'];
  charArray.forEach(c => searchPhrase.replace(c, ' '));
  let searchWords = searchPhrase.split(' ');
  for (let i = 0; i < searchWords.length; i++) {
    searchWords[i] = searchWords[i].trim();
  }
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